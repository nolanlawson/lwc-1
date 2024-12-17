import { createElement } from 'lwc';
import Table from 'x/table';
import { dataStatesVariant1, dataStatesVariant2 } from 'x/data';

// TODO [#4889]: fix issue with nested for:each loops and colliding keys
fdescribe('issue-4889 - should render for:each correctly when nested', () => {
    [dataStatesVariant1, dataStatesVariant2].forEach((dataStates, i) => {
        it(`variant ${i + 1}`, async () => {
            const elm = createElement('x-table', { is: Table });
            document.body.appendChild(elm);

            for (const dataState of dataStates) {
                await new Promise(setTimeout);
                elm.items = dataState;
            }
            // two ticks necessary to catch the unhandled rejection
            await new Promise(setTimeout);
            await new Promise(setTimeout);
        });
    });
});
