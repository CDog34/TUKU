'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'production',
  apiBase: '//tuku-api.izhai.net/'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
