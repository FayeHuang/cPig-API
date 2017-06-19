const express = require('express');
const router = express.Router();
const http = require("./libs/http");
const checkIfExist = require("./libs/checkIfExist");
const permission = require("./libs/permission");

const communityRequisitions = require("./communityRequisitions");
const householdRequisitions = require("./householdRequisitions");
const communities = require("./communities");
const permissions = require("./permissions");
const communityMembers = require("./communityMembers");
const householdMembers = require("./householdMembers");
const invitations = require("./invitations");
const inviteCode = require("./inviteCode"); 
const households = require("./households");
const packages = require("./packages");


router.use(checkIfExist);
router.use(permission.community);


/*
    GET     /user/roles
    GET     /user/roles/community/:communityId
    GET     /user/roles/community/:communityId/household/:householdId
    GET     /user/permissions
    GET     /user/permissions/community/:communityId/role/:role
    GET     /user/permissions/community/:communityId/household/:householdId/role/:role
*/
router.use(permissions);

/*
    GET     /user/communityRequisitions
    POST    /user/communityRequisitions
    GET     /user/communityRequisitions/:communityReqId
    PUT     /user/communityRequisitions/:communityReqId
    DELETE  /user/communityRequisitions/:communityReqId
    POST    /user/communityRequisitions/:communityReqId/verify
*/
router.use(communityRequisitions);

/*
    GET     /user/householdRequisitions
    GET     /user/householdRequisitions/:householdReqId
    DELETE  /user/householdRequisitions/:householdReqId
    GET     /communities/:communityId/householdRequisitions
    POST    /communities/:communityId/householdRequisitions
    GET     /communities/:communityId/householdRequisitions/:householdReqId
    DELETE  /communities/:communityId/householdRequisitions/:householdReqId
    POST    /communities/:communityId/householdRequisitions/:householdReqId/verify
*/
router.use(householdRequisitions);

/*
    GET     /communities
    GET     /communities/:communityId
    PUT     /communities/:communityId
    DELETE  /communities/:communityId
    POST    /user/communitySn/verify
    GET     /user/communities
    GET     /user/communities/:communityId
    GET     /communitiesDetail
    GET     /communitiesDetail/:communityId
*/
router.use(communities);

/*
    GET     /communities/:communityId/households
    GET     /communities/:communityId/households/:householdId
    DELETE  /communities/:communityId/households/:householdId
    GET     /communities/:communityId/householdsDetail
    GET     /communities/:communityId/householdsDetail/:householdId
*/
router.use(households);

/*
    GET     /communities/:communityId/households/:householdId/role/:role/members
    GET     /communities/:communityId/households/:householdId/role/:role/members/:userId
    DELETE  /communities/:communityId/households/:householdId/role/:role/members/:userId
*/
router.use(householdMembers);

/*
    GET     /user/invitations
    GET     /user/invitations/:invitationId
    DELETE  /user/invitations/:invitationId
    POST    /user/invitations/:invitationId/accept
    GET     /communities/:communityId/role/:role/beInvitedUsers
    GET     /communities/:communityId/role/:role/invitations
    POST    /communities/:communityId/role/:role/invitations
    GET     /communities/:communityId/role/:role/invitations/:invitationId
    DELETE  /communities/:communityId/role/:role/invitations/:invitationId
    GET     /communities/:communityId/households/:householdId/role/:role/beInvitedUsers
    GET     /communities/:communityId/households/:householdId/role/:role/invitations
    POST    /communities/:communityId/households/:householdId/role/:role/invitations
    GET     /communities/:communityId/households/:householdId/role/:role/invitations/:invitationId
    DELETE  /communities/:communityId/households/:householdId/role/:role/invitations/:invitationId
*/
router.use(invitations);

/*
    POST    /user/inviteCode/verify
    GET     /communities/:communityId/role/:role/inviteCode
    POST    /communities/:communityId/role/:role/inviteCode
    PUT     /communities/:communityId/role/:role/inviteCode
    DELETE  /communities/:communityId/role/:role/inviteCode
    GET     /communities/:communityId/households/:householdId/role/:role/inviteCode
    POST    /communities/:communityId/households/:householdId/role/:role/inviteCode
    PUT     /communities/:communityId/households/:householdId/role/:role/inviteCode
    DELETE  /communities/:communityId/households/:householdId/role/:role/inviteCode
*/
router.use(inviteCode);

/*
    GET     /communities/:communityId/role/:role/members
    GET     /communities/:communityId/role/:role/members/:userId
    DELETE  /communities/:communityId/role/:role/members/:userId
*/
router.use(communityMembers);

/*
    GET     /communities/:communityId/packages
    POST    /communities/:communityId/packageReceiveCodeVerify
    GET     /communities/:communityId/households/:householdId/packages
    POST    /communities/:communityId/households/:householdId/packages
    PUT     /communities/:communityId/households/:householdId/packages/:packageId
    DELETE  /communities/:communityId/households/:householdId/packages/:packageId
    POST    /communities/:communityId/households/:householdId/packages/:packageId/signUp
    GET     /communities/:communityId/households/:householdId/packages/:packageId/receiveCode
    POST    /communities/:communityId/households/:householdId/packages/:packageId/receiveCode
    PUT     /communities/:communityId/households/:householdId/packages/:packageId/receiveCode
    DELETE  /communities/:communityId/households/:householdId/packages/:packageId/receiveCode
*/
router.use(packages);


// The 404 Route (ALWAYS Keep this as the last route)
router.get('*', (req, res) => {
  http.notFound(req, res, 'URL');
});

module.exports = router;