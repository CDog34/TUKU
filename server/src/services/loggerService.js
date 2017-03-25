import winston from 'winston';
import config from '../config';

const logLevel = process.env.APP_LOGLEVEL || 'debug';
const consoleTransportsOptions = {
  timestamp() {
    return (new Date()).toLocaleString();
  },
  colorize: true,
  level: logLevel
};
export let logger = new winston.Logger({
  transports: [
    new (winston.transports.Console)(consoleTransportsOptions),
  ]
});

export function logInit() {

  logger.info('Log Level: %s', logLevel);
  logger.info('Config env: %s', config.env);
}

export function logForRequest() {
  return async(ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    const logMode = ctx.status <= 400 ? 'info' : 'warn';
    logger[logMode]('%s %s - %sms %s %s', ctx.method, ctx.url, ms, ctx.status, ctx.headers['user-agent']);
    ctx.set('X-Powered-By', `${config.appName}/${config.version}`);
  };
}

export function logStartUp(startTime, env, port) {
  const duration = Date.now() - startTime;
  logger.info('Server running in %s mode.', env);
  logger.info('Server startup in %sms.', duration);
  logger.info('Waiting for client at %s.', port);
}

export function logRouterSetup(prefix) {
  logger.info('Setting up router : %s', prefix);
}
export function logRequestErr(name, reason) {
  logger.error('Error when processing request %s : %s', name, reason);
}