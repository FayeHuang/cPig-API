const express = require('express');
const router = express.Router();

const community = require("./community");
const householder = require("./householder");

router.use(community);
router.use(householder);

module.exports = router;