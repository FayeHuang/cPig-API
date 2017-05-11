const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const permission = require("../libs/permission");
const communityRequisition = require("../../actions/communityRequisition");

/*
  URL : /user/communityRequisitions
*/
router.route('/')
.get((req, res) => {
  if (req.query.all === 'true') {
    if (permission.isAllowed(req.user.permission,'CommunityRequisitions:other:read'))
      communityRequisition.getAll().then(result => { return http.success(req, res, result) })
    else
      return http.permissionDenied(req, res);
  } 
  else {
    if (permission.isAllowed(req.user.permission,'CommunityRequisitions:own:read'))
      communityRequisition.getOwn(req.user.uid).then(result => { return http.success(req, res, result) })
    else
      return http.permissionDenied(req, res);
  }
})
.post((req, res) => {
  if (!req.body.name || !req.body.address )
    return http.badRequest(req, res, `'name' and 'address' is required`);
  
  const data = {name:req.body.name, address:req.body.address, createUser:req.user.uid};
  if (permission.isAllowed(req.user.permission,'CommunityRequisitions:create'))
    communityRequisition.create(data).then(result => { return http.success(req, res, result) })
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});


module.exports = router;