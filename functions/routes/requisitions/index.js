const express = require('express');
const router = express.Router();

const community = require("./community");
const householder = require("./householder");

router.use('/communityRequisitions', community);
router.use('/householderRequisitions', householder);

module.exports = router;