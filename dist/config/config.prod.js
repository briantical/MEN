"use strict";
const path = require('path');
module.exports = {
    bodyLimit: '100kb',
    passport: {
        tokenTime: 2592000,
        secretAuthToken: process.env.SECRET_TOKEN,
        resetPasswordExpires: 3600000 * 24,
    },
    swaggerDirPath: path.resolve(__dirname, './swagger/'),
    swaggerFilePath: path.resolve(__dirname, './swagger/swagger.prod.yaml'),
};
