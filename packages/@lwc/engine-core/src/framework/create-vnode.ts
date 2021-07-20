import { Hooks, Key, VNode, VNodeData, VNodes } from '../3rdparty/snabbdom/types';
import { getVMBeingRendered } from './template';
import { VM } from './vm';

function createRawVNode(
    children: VNodes | undefined,
    data: VNodeData,
    key: Key | undefined,
    hook: Hooks<any> | undefined,
    owner: VM | undefined
) {
    return {
        data,
        children,
        key,
        owner,
        hook,
        sel: undefined,
        text: undefined,
        elm: undefined,
        aChildren: undefined,
        ctor: undefined,
        mode: undefined,
    } as any;
}

export function createVNode(
    children: VNodes | undefined,
    data: VNodeData,
    key: Key | undefined,
    hook: Hooks<any> | undefined
): VNode {
    return createRawVNode(children, data, key, hook, getVMBeingRendered()!);
}

export function createEmptyVNode(): VNode {
    return createRawVNode(undefined, {}, undefined, undefined, undefined);
}
