const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const express = require('express');
const cors = require('cors')({origin: true});
const router = new express.Router();

const auth = require('./src/auth');

router.use(cors);
router.use(auth);

router.get('*', (req, res) => {
  res.send(`Hello ${req.user.name}`);
});

exports.api = functions.https.onRequest(router);