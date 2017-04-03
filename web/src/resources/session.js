import {Resource} from 'service/resource';

export const sessionResource = new Resource('session', {
  kill: {
    method: Resource.methods.DEL,
    uri: '/'
  },
  createForWeibo:{
    method:Resource.methods.POST,
    uri:'/weibo'
  }
});
