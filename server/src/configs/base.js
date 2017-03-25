import pkg from '../../package.json';

export const baseConfig = {
  appName: pkg.name,
  version: pkg.version,
  port: 12530,
  imageSizeLimit: 5 * 1024 * 1024
};
