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
    ctx._cachedSession = null;
    ctx.getSession = async() => {
      if (ctx._cachedSession) return ctx._cachedSession;
      const authKeyArr = getAuthKey(ctx).split('||');
      const sessionId = authKeyArr[0];
      const token = authKeyArr[1];
      if (!sessionId || !token) return null;
      const session = await Session.getSession(sessionId, token);
      if (!session) return null;
      ctx._cachedSession = session;
      return ctx._cachedSession;
    };
    ctx.getUser = async() => {
      const session = await ctx.getSession();
      if (!session) return null;
      const user = await User.findById(session.userId);
      if (!user || !user.isActive) {
        await session.remove();
        return null;
      }
      ctx._cachedUser = user;
      return user;
    };
    ctx.clearCache = () => {
      ctx._cachedSession = null;
      ctx._cachedUser = null;
    };
    await next();
  }

}
