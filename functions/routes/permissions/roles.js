const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const user = require("../../actions/user");

/*
  URL : /user/roles
*/
router.route('/')
.get((req, res) => {
  user.getRoles(req.user.uid).then(result => { return http.success(req, res, result) })
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

module.exports = router;