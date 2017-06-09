const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const permission = require("../libs/permission");

const community = require("../../actions/community");

/*
  URL : /communities/:communityId
*/
router.route('/')
.get((req, res) => {
  if (permission.isAllowed(req.user.permission, 'Communities:other:read'))
    community.getOne(req.communityId).then(result => { return http.success(req, res, result) });
  else if (permission.isAllowed(req.user.permission, 'Communities:own:read')) {
    community.isOwner(req.communityId, req.user.uid).then(result => {
      if (result) 
        community.getOne(req.communityId).then(result => { return http.success(req, res, result) });
      else
        return http.permissionDenied(req, res);
    })
  }
  else
    return http.permissionDenied(req, res);
})
.put((req, res) => {
  if (!req.body.name && !req.body.address)
    return http.badRequest(req, res, `'name' or 'address' is required`);
    
  const data = {};
  if (req.body.name)
    data.name = req.body.name;
  if (req.body.address)
    data.address = req.body.address;
  
  if (permission.isAllowed(req.user.permission, 'Communities:other:update'))
    community.modify(req.communityId, data).then(result => { return http.success(req, res, result) });
  else if (permission.isAllowed(req.user.permission, 'Communities:own:update')) {
    community.isOwner(req.communityId, req.user.uid).then(result => {
      if (result) 
        community.modify(req.communityId, data).then(result => { return http.success(req, res, result) });
      else
        return http.permissionDenied(req, res);
    })
  }
  else
    return http.permissionDenied(req, res);
})
.delete((req, res) => {
  // TODO: 把社區相關的資料都清空, ex: CommunityMembers, Householders, UserRoles ...
  
  if (permission.isAllowed(req.user.permission, 'Communities:other:delete')) {
    return res.json({success:true})
  }
  else if (permission.isAllowed(req.user.permission, 'Communities:own:delete')) {
    return res.json({success:true})
  }
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

module.exports = router;