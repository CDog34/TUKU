import {LocalStorageService} from 'service/localStorage';
import {Resource} from 'service/resource';

export class SessionSrvice {
  static sessionCache = null;

  static startSession(session) {
    LocalStorageService.setItem('session', session);
    SessionSrvice.sessionCache = session;
    Resource.setHeader('X-Tuku-Auth', `${session._id}||${session.token}`);
  }

  static killSession() {
    LocalStorageService.removeItem('session');
    SessionSrvice.sessionCache = null;
    Resource.setHeader('X-Tuku-Auth', null);
  }

  static initSession() {
    const session = SessionSrvice.getSession();
    if (!session)  return null;
    SessionSrvice.sessionCache = session;
    Resource.setHeader('X-Tuku-Auth', `${session._id}||${session.token}`);
  }

  static getSession() {
    return SessionSrvice.sessionCache || LocalStorageService.getItem('session');
  }

  static isExist() {
    return !!SessionSrvice.getSession();
  }
}
