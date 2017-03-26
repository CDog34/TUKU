import {getMyProfileByCode} from '../services/weiboService'


export async function handleWeiboCallback(code) {
  return await getMyProfileByCode(code);
}