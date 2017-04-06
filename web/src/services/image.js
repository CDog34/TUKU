import {imageResource} from 'resource/image';
import {SessionService} from 'service/session';
import config from 'config';

export class ImageService {
  static async loadHistory(query) {
    if (config.appEnv === "dev") return await imageResource.getAll(query);
    if (!SessionService.isExist()) return null;
    return await imageResource.getHistory(query);
  }

}
