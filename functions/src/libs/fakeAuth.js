const admin = require('firebase-admin');
const permission = require("./permission");
const http = require("./http");

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
        'Make sure you authorize your request by providing the following HTTP header:',
        'Authorization: Bearer <Firebase ID Token>');
    http.unauthorized(req, res);
    return;
  }
  const uid = req.headers.authorization;
  admin.database().ref(`Users/${uid}`).once('value').then(snapshot => {
    if (snapshot.val()) {
      permission.system(uid).then(result => {
        req.user = Object.assign(snapshot.val(), {uid:uid, permission:result});
        next();
      })
    }
    else
      http.unauthorized(req, res);
  }).catch((error) => http.internalServerError(req, res, error));
};