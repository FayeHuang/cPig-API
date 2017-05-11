const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const community = require("../../actions/community");


/*
  URL : /user/communitySn/verify
*/
router.route('/')
.post((req, res) => {
  if (!req.body.sn)
    return http.badRequest(req, res, `'sn' is required`)
  
  community.getCommunityBySN(req.body.sn).then(result => {
    if (result)
      return http.success(req, res, result)
    else
      return http.badRequest(req, res, `wrong sn '${req.body.sn}'`)
  })
})
.all((req, res) => {return http.methodNotAllowed(req, res)});


module.exports = router;