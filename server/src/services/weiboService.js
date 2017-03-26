import axios from 'axios';
import config from '../config';

const urlBase = 'https://api.weibo.com/';
const weiboConfig = config.weibo;

async function doRequest(option) {
  const res = await axios.request(option);
  if (res.status !== 200) throw res.data;
  return res.data;
}

export async function getAccessToken(code) {
  const options = {
    url: `${urlBase}oauth2/access_token`,
    params: {
      code,
      'client_id': weiboConfig.appKey,
      'client_secret': weiboConfig.appSecret,
      'grant_type': 'authorization_code',
      'redirect_uri': weiboConfig.callbackUrl
    },
    method: 'post'
  };
  const res = await doRequest(options);
  return res['access_token'];
}

export async function getMyUid(accessToken) {
  const options = {
    url: `${urlBase}2/account/get_uid.json`,
    params: {
      'access_token': accessToken
    }
  };
  const res = await doRequest(options);
  return res['uid'];
}
export async function getProfile(uid, accessToken) {
  const options = {
    url: `${urlBase}2/users/show.json`,
    params: {
      uid,
      'access_token': accessToken
    }
  };
  return await doRequest(options);
}

export async function getMyProfileByCode(code) {
  const accessToken = await getAccessToken(code);
  const uid = await getMyUid(accessToken);
  const profile = await getProfile(uid, accessToken);
  return {accessToken, profile}
}