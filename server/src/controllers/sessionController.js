import {Session, CategoryEnum} from '../models/sessionModel';
import config from '../config';
import {generateToken} from '../services/securityService';


export async function startWeiboSession(userId, existSession) {
  let session = existSession;
  if (!session) {
    session = new Session();
  }
  session.userId = userId;
  session.token = await generateToken();
  session.category = CategoryEnum.WEIBO;
  session.validUntil = Date.now() + config.security.maxAge;
  await session.save();
  return session;
}