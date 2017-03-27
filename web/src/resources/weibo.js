import {Resource} from 'service/resource';

export const weiboResource = new Resource('weibo', {
  loginFromWeibo: {
    method: Resource.methods.GET,
    uri: '/callback'
  },
});
