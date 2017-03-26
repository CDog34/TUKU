

const dbUrl = process.env.APP_DB_URL || '';
import {logger} from '../services/loggerService';
let secretConfig = null;

try {
  secretConfig = JSON.parse(process.env.PRODUCTION_SECRET);
} catch (err) {
  logger.error(err.message);
  secretConfig = {};
}
export const envConfig = {

  env: 'production',

  dbUrl: dbUrl,
  CDNBase: '//tuku.izhai.net/',

  upyun: {
    uploadFilePrefix: '',
    bucket: 'tuku-image-hosting',
    endpoint: 'v0.api.upyun.com',
    operator: secretConfig.operator,
    password: secretConfig.password,
  }
};