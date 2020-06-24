const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

module.exports = {
  port: process.env.PORT,
  databaseURL: process.env.DATABASE_URL,
  jwt: {
    secret: process.env.JWT_SECRET,
    expirationTime: process.env.JWT_EXPIRATION_TIME,
  },
  facebook: {
    appID: process.env.FB_APP_ID,
    secret: process.env.FB_SECRET,
  },
  google: {
    secret: process.env.MAPS_SECRET,
  },
};
