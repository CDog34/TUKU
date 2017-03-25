'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dev',  // feel free to remove the appEnv property here
  apiBase: '//localhost:12530/'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
