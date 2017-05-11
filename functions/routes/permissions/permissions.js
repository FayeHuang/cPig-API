const express = require('express');
const router = express.Router();
const http = require("../libs/http");

/*
  URL : /user/permissions
*/
router.route('/')
.get((req, res) => {
  const result = {success:true, message:req.user.permission};
  return http.success(req, res, result)
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

module.exports = router;