const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const express = require('express');
const cors = require('cors');
const router = new express.Router();
const bodyParser = require('body-parser');
const http = require("./routes/libs/http");

const auth = require('./routes/libs/auth');
const requisitions = require('./routes/requisitions');
const communities = require('./routes/communities');
const permissions = require('./routes/permissions');
const invitations = require('./routes/invitations');

router.use(cors());
router.use('/doc', express.static('apidoc'));
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
router.use(auth);

router.use('/permissions', permissions);
router.use('/requisitions', requisitions);
router.use('/communities', communities);
router.use('/invitations', invitations);

// The 404 Route (ALWAYS Keep this as the last route)
router.get('*', (req, res) => {
  return http.notFound(req, res);
});

exports.api = functions.https.onRequest(router);


exports.newUserInit = functions.auth.user().onCreate(event => {
  const user = event.data; // The Firebase user.
  const uid = user.uid;
  const email = user.email ? user.email : ''; // The email of the user.
  const displayName = user.displayName ? user.displayName : ''; // The display name of the user.
  const photoURL = user.photoURL ? user.photoURL : '';
  const isPublic = true;
  
  const usersRef = admin.database().ref(`Users/${uid}`);
  const userRolesRef = admin.database().ref(`UserRoles/${uid}`);
  
  usersRef.set({ name:displayName, email:email, photo:photoURL, isPublic:isPublic });
  userRolesRef.set({ system:{USER:true} });
});