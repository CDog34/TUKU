import {configResource} from 'resource/config';
import config from 'config';

export class ConfigService {
  static cachedConfig = null;
  static configReady = false;

  static async loadConfigFromRemote() {
    ConfigService.cachedConfig = await configResource.get();
    ConfigService.configReady = true;
  }

  static async getConfigItem(key) {
    if (config[key]) return config[key];
    if (!ConfigService.configReady) {
      await ConfigService.loadConfigFromRemote();
    }
    return ConfigService.cachedConfig[key];
  }
}
