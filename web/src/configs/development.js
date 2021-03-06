'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dev',
  apiBase: '//localhost:12530/'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
