import UpYun from 'upyun';
import tools from 'upyun/tools';
import config from '../config';

const {upyun : upyunConfig} = config;

const upyun = new UpYun(
  upyunConfig.bucket,
  upyunConfig.operator,
  upyunConfig.password,
  upyunConfig.endpoint,
  {apiVersion: 'v2'}
);

export function uploadFile(file, options) {
  const opt = options || {};
  const useWebp = opt.webp || true;
  const uploadOptions = {};
  uploadOptions['x-gmkerl-thumb'] = '';
  if (useWebp) uploadOptions['x-gmkerl-thumb'] += '/format/webp';
  return new Promise((res, rej) => {
    try {
      const remoteKey = `${upyunConfig.uploadFilePrefix}/${Date.now()}-${encodeURIComponent(file.name)}`;
      upyun.putFile(`${upyunConfig.uploadFilePrefix}/${Date.now()}-${file.name}`,
        file.path,
        file.type,
        true,
        uploadOptions,
        (err, data) => {
          if (err) throw err;
          res(Object.assign({}, data, {remoteKey: remoteKey}));
        });
    } catch (err) {
      rej(err);
    }
  });
}

export function md5sumFile(file) {
  return new Promise((res, rej) => {
    try {
      tools.md5sumFile(file.path,
        (err, data) => {
          if (err) throw err;
          res(data);
        });
    } catch (err) {
      rej(err);
    }
  });
}