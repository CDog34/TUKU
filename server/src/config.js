import {baseConfig} from './configs/base';

let env = process.env.NODE_ENV || 'development';

if (['production', 'staging', 'development'].indexOf(env.toLowerCase()) === -1) env = 'development';

const importPath = `./configs/${env}`;
const envConfig = require(importPath).envConfig; // eslint-disable-line

export default Object.assign({}, baseConfig, envConfig);
