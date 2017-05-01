const admin = require('firebase-admin');
const http = require('./http');

exports.communityExist =  (req, res, next) => {
  admin.database().ref(`Communities/${req.params.communityId}`).once('value')
  .then(snapshot => {
    if (snapshot.val()) {
      req.communityId = req.params.communityId;
      next();
    }
    else
      return http.badRequest(req, res, `community "${req.params.communityId}" does not exist`);
  })
}