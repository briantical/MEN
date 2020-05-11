import devConfig from './config.dev';
import prodConfig from './config.prod';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
    }
  }
}

const type = process.env.NODE_ENV;

const configs = {
  development: devConfig,
  production: prodConfig
};

export = {
  config: configs[type] || configs.development
};
