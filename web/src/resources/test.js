import {Resource} from 'service/resource';

export const testResource = new Resource('', {
  list: {
    method: Resource.methods.GET,
    uri: '/'
  },
});
