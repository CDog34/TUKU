import {Resource} from 'service/resource';

export const configResource = new Resource('config', {
  get: {
    method: Resource.methods.GET,
    uri: '/'
  }
});
