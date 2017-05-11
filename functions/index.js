const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const express = require('express');
const cors = require('cors');
const router = new express.Router();
const bodyParser = require('body-parser');
const auth = require('./routes/libs/auth');
const routes = require("./routes");

router.use(cors());
router.use('/doc', express.static('apidoc'));
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
router.use(auth);
router.use(routes);
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