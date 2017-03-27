import {weiboResource} from 'resource/weibo';

export class WeiboService {
  static async getUserId(code) {
    return await weiboResource.getLocalUserId({code});
  }
}
