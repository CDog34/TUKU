import {LocalStorageService} from 'service/localStorage';
import {Resource} from 'service/resource';

export class SessionService {
  static sessionCache = null;

  static startSession(session) {
    LocalStorageService.setItem('session', session);
    SessionService.sessionCache = session;
    Resource.setHeader('X-Tuku-Auth', `${session._id}||${session.token}`);
  }

  static killSession() {
    LocalStorageService.removeItem('session');
    SessionService.sessionCache = null;
    Resource.setHeader('X-Tuku-Auth', null);
  }

  static initSession() {
    const session = SessionService.getSession();
    if (!session)  return null;
    SessionService.sessionCache = session;
    Resource.setHeader('X-Tuku-Auth', `${session._id}||${session.token}`);
  }

  static getSession() {
    return SessionService.sessionCache || LocalStorageService.getItem('session');
  }

  static isExist() {
    return !!SessionService.getSession();
  }
}
