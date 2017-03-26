const dbUrl = process.env.APP_DB_URL || '';
import {logger} from '../services/loggerService';
let secretConfig = null;

try {
  secretConfig = JSON.parse(process.env.DEVELOPMENT_SECRET);
} catch (err) {
  logger.error(err.message);
  secretConfig = {};
}


export const envConfig = {
  env: 'staging',

  dbUrl: dbUrl,
  CDNBase: 'http://tuku-2-staging.b0.upaiyun.com/',

  upyun: {
    uploadFilePrefix: 'stagingUpload',
    bucket: 'tuku-2-staging',
    endpoint: 'v0.api.upyun.com',
    operator: secretConfig.operator,
    password: secretConfig.password,
  }
};