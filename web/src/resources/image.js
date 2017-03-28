import {Resource} from 'service/resource';

export const imageResource = new Resource('image', {
  getHistory: {
    method: Resource.methods.GET,
    uri: '/history'
  },
});
