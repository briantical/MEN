import path from 'path';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET_TOKEN: 'developmentproduction';
    }
  }
}

export = {
  bodyLimit: '100kb',
  passport: {
    tokenTime: 2592000, // 60*60*24*30 -> 30 days
    secretAuthToken: process.env.SECRET_TOKEN,
    resetPasswordExpires: 3600000 * 24 // 24 hour
  },
  swaggerDirPath: path.resolve(__dirname, './swagger/'),
  swaggerFilePath: path.resolve(__dirname, './swagger/swagger.prod.yaml')
};
