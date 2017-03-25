import {logger} from '../services/loggerService';
let secretConfig = null;

try {
  secretConfig = JSON.parse(process.env.DEVELOPMENT_SECRET)
} catch (err) {
  logger.error(err.message);
  secretConfig = {};
}

export const envConfig = {
  env: 'development',

  upyun: {
    uploadFilePrefix: 'testUpload',
    bucket: 'tuku-2-staging',
    endpoint: 'v0.api.upyun.com',
    operator: secretConfig.operator,
    password: secretConfig.password,
  }
};