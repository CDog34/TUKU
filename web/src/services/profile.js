import {userResource} from 'resource/user';
export class ProfileService {
  static _cachedMyProfile = null;

  static async loadMyProfileFromRemote() {
    const res = await userResource.loadMy();
    ProfileService._cachedMyProfile = res;
    return ProfileService._cachedMyProfile;
  }

  static async getMyProfile() {
    return ProfileService._cachedMyProfile || await ProfileService.loadMyProfileFromRemote();
  }

  static async clearCache() {
    ProfileService._cachedMyProfile = null;
  }
}
