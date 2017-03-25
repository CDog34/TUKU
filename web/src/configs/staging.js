'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'staging',  // feel free to remove the appEnv property here
  apiBase: 'https://staging-api.moetun.xyz/'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
