const admin = require('firebase-admin');
const permission = require("./permission");
const http = require("./http");

// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
module.exports = (req, res, next) => {
  // console.log('Check if request is authorized with Firebase ID token');

  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
        'Make sure you authorize your request by providing the following HTTP header:',
        'Authorization: Bearer <Firebase ID Token>');
    http.unauthorized(req, res);
    return;
  }
  const idToken = req.headers.authorization.split('Bearer ')[1];
  admin.auth().verifyIdToken(idToken).then(decodedIdToken => {
    // console.log('ID Token correctly decoded', decodedIdToken);
    const uid = decodedIdToken.uid;
    // permission.system(uid);
    
    permission.system(uid).then(result => {
      req.user = Object.assign(decodedIdToken, {permission:result});
      next();
    })
  }).catch(error => {
    console.error('Error while verifying Firebase ID token:', error);
    http.unauthorized(req, res);
  });
};