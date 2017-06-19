const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const express = require('express');
const cors = require('cors');
const router = new express.Router();
const bodyParser = require('body-parser');
const auth = require('./routes/libs/auth');
const routes = require("./routes");
const RateLimit = require('express-rate-limit');


//
router.use(cors());
router.use('/doc', express.static('apidoc'));
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
router.use(auth);
router.use(routes);
//router.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
var limiter = new RateLimit({
  windowMs: 15*60*1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached
});
router.use(limiter);
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