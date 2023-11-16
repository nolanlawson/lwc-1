const { worker } = require('workerpool');
const { rollup } = require('rollup');

// Cache reused between each compilation to speed up the compilation time.
let cache;

async function transform({ intro, outro, input, plugins, iifeName, globals, external }) {
    try {
        const bundle = await rollup({
            input,
            plugins: plugins.map(([name, options]) => require(name)(options)),
            cache,

            external,

            onwarn(warning, warn) {
                // Ignore warnings from our own Rollup plugin
                if (warning.plugin !== 'rollup-plugin-lwc-compiler') {
                    warn(warning);
                }
            },
        });

        // eslint-disable-next-line require-atomic-updates
        cache = bundle.cache;

        const { output } = await bundle.generate({
            format: 'iife',
            sourcemap: 'inline',
            name: iifeName,
            globals,
            intro,
            outro,
        });

        const { code, map } = output[0];
        const { watchFiles } = bundle;

        return { code, map, watchFiles };
    } catch (error) {
        return { error };
    }
}

worker({
    transform,
});
