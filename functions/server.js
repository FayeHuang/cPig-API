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
const routes = require("./routes");

router.use(cors);
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
router.use('/doc', express.static('apidoc'));
router.use(fakeAuth);

router.use(routes);

var app = express();
// 將路由套用至應用程式
app.use(router);

module.exports = app;
