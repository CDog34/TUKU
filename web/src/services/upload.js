import axios from 'axios';
import config from 'config';
import {Resource} from 'service/resource';

export class UploadService {
  static async uploadSingleFile(file, onProgress) {
    const formData = new FormData();
    formData.append('file', file);
    const requestOptions = {
      url: config.apiBase + 'upload',
      method: 'post',
      data: formData,
      headers: Resource.getHeader(),
      onUploadProgress: onProgress
    };
    const res = await axios.request(requestOptions);
    if (res.status !== 200) throw res.data;
    return res.data;
  }
}
