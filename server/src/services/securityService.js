import config from '../config';
import crypto from 'crypto';
import {Session} from '../models/sessionModel';
import {User} from '../models/userModel';

export function generateToken() {
  return new Promise((res, rej) => {
    crypto.randomBytes(config.security.tokenLength, (err, buf) => {
      if (err) return rej('generate error');
      res(buf.toString('hex'));
    });
  });
}

export function securityMiddleWare() {
  const getAuthKey = (ctx) => ctx.headers['x-tuku-auth'] || '';
  return async(ctx, next) => {
    ctx._cachedUser = null;
    ctx.getUser = async() => {
      if (ctx._cachedUser) return ctx._cachedUser;
      const authKeyArr = getAuthKey(ctx).split('||');
      const sessionId = authKeyArr[0];
      const token = authKeyArr[1];
      if (!sessionId || !token) return null;
      const session = await Session.getSession(sessionId, token);
      if (!session) return null;
      const user = await User.findById(session.userId);
      if (!user || !user.isActive) {
        await session.remove();
        return null;
      }
      ctx._cachedUser = user;
      return user;
    };
    await next();
  }

}
