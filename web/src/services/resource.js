import config from 'config';
import _ from 'lodash';
import axios from 'axios';

export class Resource {
  static header = {
    'Client-Type': `${config.appName}/${config.appVersion}`
  };

  static setHeader(key, value) {
    Resource.header[key] = value;
  }

  static getHeader() {
    return Resource.header;
  }

  static methods = {
    POST: 'post',
    GET: 'get',
    PUT: 'put',
    DEL: 'delete'
  };

  static  jsonToQueryString(json) {
    if (!json) return null;
    let isFirst = true;
    return _.map(Object.keys(json), function (key) {
      const prefix = isFirst ? '?' : '';
      isFirst = false;
      return prefix + encodeURIComponent(key) + '=' +
        encodeURIComponent(json[key]);
    }).join('&');
  }

  static parseUri(uri, params) {
    if (!params) return uri;
    let uriArr = uri.split('/');
    uriArr = _.map(uriArr, (path) => {
      if (path[0] === ':') {
        const res = params[path.slice(1)];
        delete params[path.slice(1)];
        return res;
      }
      return path;
    });
    return uriArr.join('/') + Resource.jsonToQueryString(params);
  }


  constructor(baseUri, methods) {
    this.baseUrl = config.apiBase + baseUri;
    _.forEach(methods, (value, key) => {
      this[key] = async (uriParams, bodyPayload) => {
        const parsedUri = Resource.parseUri(value.uri, uriParams);
        const config = {
          url: this.baseUrl + parsedUri,
          method: value.method,
          headers: Resource.getHeader()
        };
        if ([Resource.methods.POST, Resource.methods.PUT].indexOf(value.method) !== -1) config.data = bodyPayload;
        const res = await axios.request(config);
        if (res.status >= 400) throw res.data;
        return res.data;

      };
    });
  }
}
