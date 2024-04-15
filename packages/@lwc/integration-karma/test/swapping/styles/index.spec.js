import { createElement, swapStyle } from 'lwc';
import { extractDataIds } from 'test-utils';
import Simple from 'x/simple';
import StaleProp from 'x/staleProp';

// Swapping is only enabled in dev mode
if (process.env.NODE_ENV !== 'production') {
    describe('style swapping', () => {
        it('should work with components with implicit style definition', async () => {
            const { blockStyle, inlineStyle, noneStyle } = Simple;
            const elm = createElement('x-simple', { is: Simple });
            document.body.appendChild(elm);
            await Promise.resolve();
            expect(getComputedStyle(extractDataIds(elm).paragraph).display).toBe(
                'block',
                'the default display should be block'
            );
            swapStyle(blockStyle[0], inlineStyle[0]);
            await Promise.resolve();
            expect(getComputedStyle(extractDataIds(elm).paragraph).display).toBe('inline');
            swapStyle(inlineStyle[0], noneStyle[0]);
            await Promise.resolve();

            expect(getComputedStyle(extractDataIds(elm).paragraph).display).toBe('none');
        });

        it('should remove stale prop', async () => {
            const { stylesV1, stylesV2 } = StaleProp;
            const elm = createElement('x-stale-prop', { is: StaleProp });
            document.body.appendChild(elm);

            await Promise.resolve();
            expect(getComputedStyle(extractDataIds(elm).paragraph).color).toBe('rgb(0, 0, 0)');
            expect(getComputedStyle(extractDataIds(elm).paragraph).backgroundColor).toBe(
                'rgb(255, 0, 0)'
            );

            swapStyle(stylesV1[0], stylesV2[0]);

            await Promise.resolve();
            expect(getComputedStyle(extractDataIds(elm).paragraph).color).toBe('rgb(0, 0, 255)');
            expect(getComputedStyle(extractDataIds(elm).paragraph).backgroundColor).toBe(
                'rgb(0, 0, 0)'
            );
        });
    });
}
