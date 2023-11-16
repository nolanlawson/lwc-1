const path = require('node:path');
const { pool } = require('workerpool');

const workerPool = pool(require.resolve('./rollup-worker.js'));

module.exports.runRollupFromKarma = async function runRollupFromKarma({
    rollupWorkerOptions,
    basePath,
    input,
    log,
    watcher,
    file,
    content,
    done,
}) {
    const { code, map, watchFiles, error } = await workerPool.exec('transform', [
        rollupWorkerOptions,
    ]);

    if (error) {
        const location = path.relative(basePath, file.path);
        log.error('Error processing “%s”\n\n%s\n', location, error.stack || error.message);

        if (process.env.KARMA_MODE === 'watch') {
            log.error('Ignoring error in watch mode');
            done(null, content); // just pass the untransformed content in for now
        } else {
            done(error, null);
        }
    } else {
        // no error
        watcher.watchSuite(input, watchFiles);

        // We need to assign the source to the original file so Karma can source map the error in the console. Add
        // also adding the source map inline for browser debugging.
        // eslint-disable-next-line require-atomic-updates
        file.sourceMap = map;

        done(null, code);
    }
};
