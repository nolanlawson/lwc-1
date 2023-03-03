// We can use a single observer without having to worry about leaking because
// "Registered observers in a node’s registered observer list have a weak
// reference to the node."
// https://dom.spec.whatwg.org/#garbage-collection
import { isUndefined } from '@lwc/shared';
import { RendererAPI } from './renderer';

const observedElements = new WeakSet<Node>();
const nodesToShadowTokens = new WeakMap<Node, string>();
const syntheticSyntheticShadowRoots: WeakRef<ShadowRoot>[] = [];

// eslint-disable-next-line @lwc/lwc-internal/no-global-node
const compareDocumentPosition = Node.prototype.compareDocumentPosition;

const portalObserverConfig: MutationObserverInit = {
    childList: true,
};

function isSyntheticShadowHost(node: Node): Boolean {
    return ((node as any)?.shadowRoot as any)?.synthetic;
}

function adoptChildNode(
    portalObserver: MutationObserver,
    node: Node,
    shadowToken: string | undefined,
    renderer: RendererAPI
) {
    if (node instanceof Element) {
        setShadowToken(node, shadowToken, renderer);

        if (isSyntheticShadowHost(node)) {
            // Root LWC elements can't get content slotted into them, therefore we don't observe their children.
            return;
        }

        if (!observedElements.has(node)) {
            // we only care about Element where no MO.observe has been called
            portalObserver.observe(node, portalObserverConfig);
        }
        // recursively patching all children as well
        const childNodes = renderer.getChildNodes(node);
        for (let i = 0, len = childNodes.length; i < len; i += 1) {
            adoptChildNode(portalObserver, childNodes[i], shadowToken, renderer);
        }
    }
}

function initPortalObserver(renderer: RendererAPI): MutationObserver {
    const portalObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            /**
             * This routine will process all nodes added or removed from elm (which is marked as a portal)
             * When adding a node to the portal element, we should add the ownership.
             * When removing a node from the portal element, this ownership should be removed.
             *
             * There is some special cases in which MutationObserver may call with stacked mutations (the same node
             * will be in addedNodes and removedNodes) or with false positives (a node that is removed and re-appended
             * in the same tick) for those cases, we cover by checking that the node is contained
             * (or not in the case of removal) by the element.
             */
            const { target: elm, addedNodes, removedNodes } = mutation;
            const shadowToken = getShadowToken(elm);

            // Process removals first to handle the case where an element is removed and reinserted
            for (let i = 0, len = removedNodes.length; i < len; i += 1) {
                const node: Node = removedNodes[i];
                if (
                    // eslint-disable-next-line @lwc/lwc-internal/no-global-node
                    !(compareDocumentPosition.call(elm, node) & Node.DOCUMENT_POSITION_CONTAINED_BY)
                ) {
                    adoptChildNode(portalObserver, node, undefined, renderer);
                }
            }

            for (let i = 0, len = addedNodes.length; i < len; i += 1) {
                const node: Node = addedNodes[i];
                // eslint-disable-next-line @lwc/lwc-internal/no-global-node
                if (compareDocumentPosition.call(elm, node) & Node.DOCUMENT_POSITION_CONTAINED_BY) {
                    adoptChildNode(portalObserver, node, shadowToken, renderer);
                }
            }
        }
    });
    return portalObserver;
}

export function markElementAsPortal(elm: Element, shadowRoot: ShadowRoot, renderer: RendererAPI) {
    const portalObserver = initPortalObserver(renderer);

    // install mutation observer for portals
    portalObserver.observe(elm, portalObserverConfig);
    // TODO [#1253]: optimization to synchronously adopt new child nodes added
    // to this elm, we can do that by patching the most common operations
    // on the node itself
    observedElements.add(elm);
}

export function setShadowToken(elm: Node, token: string | undefined, renderer: RendererAPI) {
    const { removeAttribute, setAttribute } = renderer;
    // Do what @lwc/synthetic shadow does, which is set the token
    const oldShadowToken = nodesToShadowTokens.get(elm);
    if (!isUndefined(oldShadowToken) && oldShadowToken !== token) {
        removeAttribute(elm, oldShadowToken);
    }
    if (isUndefined(token)) {
        nodesToShadowTokens.delete(elm);
    } else {
        setAttribute(elm, token, '');
        nodesToShadowTokens.set(elm, token);
    }
}

function getShadowToken(elm: Node) {
    return nodesToShadowTokens.get(elm);
}

export function setUpSyntheticSyntheticShadow(shadowRoot: ShadowRoot) {
    (shadowRoot as any).synthetic = true; // signal to the component author that this is synthetic shadow

    // attach global styles
    const styles = document.head.querySelectorAll('link[rel="stylesheet"],style');
    for (let i = 0; i < styles.length; i++) {
        const style = styles[i];
        shadowRoot.appendChild(style.cloneNode(true));
    }

    syntheticSyntheticShadowRoots.push(new WeakRef(shadowRoot));
}

export function getAllSyntheticSyntheticShadowRoots() {
    const result = [];
    for (const weakRef of syntheticSyntheticShadowRoots) {
        const root = weakRef.deref();
        if (!isUndefined(root)) {
            result.push(root);
        }
    }
    return result;
}
