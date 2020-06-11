const db = require('../db');
const config = require('../config');
const axios = require('axios');
const { CredentialsError } = require('../errors');

const authUser = async (email, password) => {
  const user = await db.User.findOne({ email });
  const isMatch = await user.comparePassword(password);
  if (isMatch) return user;
  // throw error if no match
  throw new CredentialsError();
};

const verifyAccessToken = async (input_token, fbId) => {
  const access_token = `${config.facebook.appID}|${config.facebook.secret}`;

  //as per https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow#checktoken
  const response = await axios({
    method: 'GET',
    url: `https://graph.facebook.com/debug_token?input_token=${input_token}&access_token=${access_token}`,
  });

  const { app_id, is_valid, user_id } = response.data.data;
  if (app_id !== config.facebook.appID || !is_valid || user_id !== fbId)
    throw new CredentialsError();

  //get user information using the access token send by the client (react app).
  const profile = await axios({
    method: 'GET',
    url: `https://graph.facebook.com/me?access_token=${input_token}&fields=name,email,picture`,
  });

  // return a nicely formated user object.
  return {
    displayName: profile.data.name,
    email: profile.data.email,
    imageUrl: profile.data.picture.data.url,
    fbId: profile.data.id,
  };
};

module.exports = {
  authUser,
  verifyAccessToken,
};
