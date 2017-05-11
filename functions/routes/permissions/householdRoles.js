const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const user = require("../../actions/user");

/*
  URL : /user/roles/community/:communityId/household/:householdId
*/
router.route('/')
.get((req, res) => {
  user.getRolesInHousehold(req.user.uid, req.communityId, req.householdId).then(result => { return http.success(req, res, result) })
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

module.exports = router;