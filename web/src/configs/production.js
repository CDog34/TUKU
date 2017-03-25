'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'production'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
