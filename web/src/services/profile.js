import {userResource} from 'resource/user';
import {SessionService} from 'service/session';
import {rootComponent} from 'main';

export class ProfileService {
  static _cachedMyProfile = null;

  static async loadMyProfileFromRemote() {
    if (!SessionService.isExist()) return null;
    const res = await userResource.loadMy();
    ProfileService._cachedMyProfile = res;
    rootComponent.$emit('profileUpdate');
    return ProfileService._cachedMyProfile;
  }

  static async getMyProfile() {
    return ProfileService._cachedMyProfile || await ProfileService.loadMyProfileFromRemote();
  }

  static clearCache() {
    ProfileService._cachedMyProfile = null;
    rootComponent.$emit('profileUpdate');
  }
}
