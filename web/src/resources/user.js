import {Resource} from 'service/resource';

export const userResource = new Resource('user', {
  loadMy: {
    method: Resource.methods.GET,
    uri: '/me'
  },
});
