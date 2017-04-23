const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const express = require('express');
const cors = require('cors')({origin: true});
const router = new express.Router();

const auth = require('./src/libs/auth');
const requisitions = require('./src/requisitions');

router.use(cors);
router.use(auth);

router.use('/requisitions', requisitions);

//The 404 Route (ALWAYS Keep this as the last route)
router.get('*', (req, res) => {
  res.send('not found', 404);
});



exports.api = functions.https.onRequest(router);


exports.newUserInit = functions.auth.user().onCreate(event => {
  const user = event.data; // The Firebase user.
  const uid = user.uid;
  const email = user.email; // The email of the user.
  const displayName = user.displayName; // The display name of the user.
  const photoURL = user.photoURL;
  const isPublic = true;
  
  const usersRef = admin.database().ref(`Users/${uid}`);
  const userRolesRef = admin.database().ref(`UserRoles/${uid}`);
  
  usersRef.set({ name:displayName, email:email, photo:photoURL, isPublic:isPublic });
  userRolesRef.set({ system:{USER:true} });
});