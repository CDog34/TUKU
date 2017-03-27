import {LocalStorageService} from 'service/localStorage';
import {Resource} from 'service/resource';
import {ProfileService} from 'service/profile';
import {rootComponent} from 'main';

export class SessionService {
  static sessionCache = null;

  static startSession(session) {
    LocalStorageService.setItem('session', session);
    SessionService.sessionCache = session;
    Resource.setHeader('X-Tuku-Auth', `${session._id}||${session.token}`);
    ProfileService.loadMyProfileFromRemote();
    rootComponent.$emit('profileUpdate');
  }

  static killSession() {
    LocalStorageService.removeItem('session');
    SessionService.sessionCache = null;
    Resource.setHeader('X-Tuku-Auth', null);
    ProfileService.clearCache();
    rootComponent.$emit('profileUpdate');
  }

  static async initSession() {
    const session = SessionService.getSession();
    if (!session)  return null;
    SessionService.sessionCache = session;
    Resource.setHeader('X-Tuku-Auth', `${session._id}||${session.token}`);
    const res = await ProfileService.getMyProfile();
    console.log('[Dbg.jq:res]:', res); // eslint-disable-line
    rootComponent.$emit('profileUpdate');
  }

  static getSession() {
    return SessionService.sessionCache || LocalStorageService.getItem('session');
  }

  static isExist() {
    return !!SessionService.getSession();
  }
}
