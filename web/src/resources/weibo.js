import {Resource} from 'service/resource';

export const weiboResource = new Resource('weibo', {
  getLocalUserId: {
    method: Resource.methods.GET,
    uri: '/callback'
  },
});
