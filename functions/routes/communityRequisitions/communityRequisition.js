const express = require('express');
const router = express.Router();
const http = require("../libs/http");

const permission = require("../libs/permission");
const communityRequisition = require("../../actions/communityRequisition");

/*
  URL : /user/communityRequisitions/:communityReqId
*/
router.route('/')
.get((req, res) => {
  if (permission.isAllowed(req.user.permission, 'CommunityRequisitions:other:read'))
    communityRequisition.getOne(req.communityReqId).then(result => { return http.success(req, res, result) });
  else if (permission.isAllowed(req.user.permission, 'CommunityRequisitions:own:read')) {
    communityRequisition.isOwner(req.communityReqId, req.user.uid).then(result => {
      if (result)
        communityRequisition.getOne(req.communityReqId).then(result => { return http.success(req, res, result) });
      else
        return http.permissionDenied(req, res);
    })
  }
  else
    return http.permissionDenied(req, res);
})
.put((req, res) => {
  if (!req.body.name && !req.body.address)
    return http.badRequest(req, res, "'name' or 'address' is required");
    
  const data = {};
  if (req.body.name)
    data.name = req.body.name;
  if (req.body.address)
    data.address = req.body.address;
  
  if (permission.isAllowed(req.user.permission, 'CommunityRequisitions:other:update')) {
    communityRequisition.modify(req.communityReqId, data).then(result => { return http.success(req, res, result) });
  }
  else if (permission.isAllowed(req.user.permission, 'CommunityRequisitions:own:update')) {
    communityRequisition.isOwner(req.communityReqId, req.user.uid).then(result => {
      if (result)
        communityRequisition.modify(req.communityReqId, data).then(result => { return http.success(req, res, result) });
      else
        return http.permissionDenied(req, res);
    })
  }
  else
    return http.permissionDenied(req, res);
})
.delete((req, res) => {
  if (permission.isAllowed(req.user.permission, 'CommunityRequisitions:other:delete')) {
    communityRequisition.remove(req.communityReqId).then(() => { return http.success(req, res) });
  }
  else if (permission.isAllowed(req.user.permission, 'CommunityRequisitions:own:delete')) {
    communityRequisition.isOwner(req.communityReqId, req.user.uid).then(result => {
      if (result)
        communityRequisition.remove(req.communityReqId).then(() => { return http.success(req, res) });
      else
        return http.permissionDenied(req, res);
    })
  }
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

module.exports = router;