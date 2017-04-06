import pkg from '../../package.json';

export const baseConfig = {
  appName: pkg.name,
  version: pkg.version,
  port: 12530,
  imageRelayDomain: ['://localhost', '://tuku.moe'],
  imageSizeLimit: 5 * 1024 * 1024,

  security: {
    tokenLength: 16,
    maxAge: 30 * 24 * 60 * 60 * 1000
  }
};
