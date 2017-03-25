import UpYun from 'upyun';
import config from '../config';

const {upyun : upyunConfig} = config;

const upyun = new UpYun(
  upyunConfig.bucket,
  upyunConfig.operator,
  upyunConfig.password,
  upyunConfig.endpoint,
  {apiVersion: 'v2'}
);

export function uploadFile(file) {
  return new Promise((res, rej) => {
    try {
      upyun.putFile(`${upyunConfig.uploadFilePrefix}/${Date.now()}-${file.name}`,
        file.path,
        file.type,
        true,
        {},
        (err, data) => {
          if (err) throw err;
          res(data)
        });
    } catch (err) {
      rej(err)
    }
  });
}