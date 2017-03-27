import {weiboResource} from 'resource/weibo';

export class WeiboService {
  static async loginFromWeibo(code) {
    return await weiboResource.loginFromWeibo({code});
  }
}
