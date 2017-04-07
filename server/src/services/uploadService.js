import UpYun from 'upyun';
import tools from 'upyun/tools';
import config from '../config';
import axios from 'axios';

const {upyun: upyunConfig} = config;

const upyun = new UpYun(
  upyunConfig.bucket,
  upyunConfig.operator,
  upyunConfig.password,
  upyunConfig.endpoint,
  {apiVersion: 'v2'}
);

export function uploadFile(file, options) {
  const opt = options || {};
  const useWebp = opt.webp || false;
  const contentSecret = opt.contentSecret || null;
  const uploadOptions = {};
  uploadOptions['x-gmkerl-thumb'] = '/progressive/true';
  if (useWebp) uploadOptions['x-gmkerl-thumb'] += '/format/webp';
  if (contentSecret) uploadOptions['Content-Secret'] = contentSecret;
  return new Promise((res, rej) => {
    try {
      const time = Date.now();
      const remoteKey = `${upyunConfig.uploadFilePrefix}/${time}-${encodeURIComponent(file.name)}`;
      upyun.putFile(`${upyunConfig.uploadFilePrefix}/${time}-${file.name}`,
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
};

export async function getImageSize(remoteKey) {
  const options = {
    url: `http://${config.CDNBase}/${remoteKey}!/info`,
    method: 'get'
  };
  const res = await axios.request(options);
  if (res.status !== 200) throw res.data;
  return res.data;
}