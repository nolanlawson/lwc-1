/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

/**
 * This transformation enables "test hooks" from within LWC's source code. These hooks are
 * designed to only be used by Karma, hence they're enabled here.
 */
'use strict';

const Watcher = require('./Watcher');

function createPreprocessor(config, emitter, logger) {
  const { basePath } = config;

  const log = logger.create('preprocessor-hooks');
  const watcher = new Watcher(config, emitter, log);

  return async (_content, file, done) => {
      console.log('running', file.path)
      done(null, _content.replaceAll(`process.env.NODE_ENV !== 'production' && typeof __karma__ !== 'undefined'`, `/* karma only */ true`))
  };
}

createPreprocessor.$inject = ['config', 'emitter', 'logger'];

module.exports = { 'preprocessor:hooks': ['factory', createPreprocessor] };
