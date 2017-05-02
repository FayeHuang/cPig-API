const admin = require('firebase-admin');
// Fetch the service account key JSON file contents
var serviceAccount = require("./cpig-firebase-adminsdk.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cpig-5b148.firebaseio.com",
});

const express = require('express');
const cors = require('cors')({origin: true});
const router = new express.Router();
const bodyParser = require('body-parser');
const fakeAuth = require('./routes/libs/fakeAuth');
const requisitions = require('./routes/requisitions');
const communities = require('./routes/communities');
const permissions = require('./routes/permissions');
const invitations = require('./routes/invitations');
const inviteCodes = require('./routes/inviteCodes');
const http = require("./routes/libs/http");

router.use(cors);
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
router.use('/doc', express.static('apidoc'));
router.use(fakeAuth);

router.use('/permissions', permissions);
router.use(requisitions);
router.use(inviteCodes);
router.use('/communities', communities);
router.use('/invitations', invitations);

// The 404 Route (ALWAYS Keep this as the last route)
router.get('*', (req, res) => {
  http.notFound(req, res);
});

var app = express();
// 將路由套用至應用程式
app.use(router);

module.exports = app;
