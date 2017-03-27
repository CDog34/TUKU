import {Session, CategoryEnum} from '../models/sessionModel';
import config from '../config';
import {generateToken} from '../services/securityService';


export async function startWeiboSession(userId) {
  const token = await generateToken();
  const newSession = new Session({
    userId,
    token,
    category: CategoryEnum.WEIBO,
    validUntil: Date.now() + config.security.maxAge
  });
  await newSession.save();
  return newSession;
}