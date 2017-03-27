import {LocalStorageService} from 'service/localStorage';
import {Resource} from 'service/resource';
import {ProfileService} from 'service/profile';

export class SessionService {
  static sessionCache = null;

  static startSession(session) {
    LocalStorageService.setItem('session', session);
    SessionService.sessionCache = session;
    Resource.setHeader('X-Tuku-Auth', `${session._id}||${session.token}`);
    ProfileService.loadMyProfileFromRemote();
  }

  static killSession() {
    LocalStorageService.removeItem('session');
    SessionService.sessionCache = null;
    Resource.setHeader('X-Tuku-Auth', null);
    ProfileService.clearCache();
  }

  static async initSession() {
    const session = SessionService.getSession();
    if (!session)  return null;
    SessionService.sessionCache = session;
    Resource.setHeader('X-Tuku-Auth', `${session._id}||${session.token}`);
    ProfileService.loadMyProfileFromRemote();
  }

  static getSession() {
    return SessionService.sessionCache || LocalStorageService.getItem('session');
  }

  static isExist() {
    return !!SessionService.getSession();
  }
}
