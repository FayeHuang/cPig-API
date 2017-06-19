const express = require('express');
const router = express.Router();
const http = require('./http');

const communityRequisition = require("../../actions/communityRequisition");
const householdRequisition = require("../../actions/householdRequisition");
const community = require("../../actions/community");
const communityMember = require("../../actions/communityMember");
const householdMember = require("../../actions/householdMember");
const invitation = require("../../actions/invitation");
const household = require("../../actions/household");
const user = require("../../actions/user");
const package = require("../../actions/package");

const checkCommunity = (req, res, next) => {
  if (req.params.communityId) {
    const communityId = req.params.communityId;
    community.isExist(communityId).then(result => {
      if (result) {
        req.communityId = communityId;
        next();      
      }
      else
        return http.notFound(req, res, `community '${communityId}'`);
    })
  }
  else
    next();
}

const checkHouseholdInCommunity = (req, res, next) => {
  if (req.params.communityId && req.params.householdId) {
    const communityId = req.params.communityId;
    const householdId = req.params.householdId;
    household.isExistInCommunity(communityId, householdId).then(result => {
      if (result) {
        req.communityId = communityId;
        req.householdId = householdId;
        next();
      }
      else
        return http.notFound(req, res, `community '${communityId}' household '${householdId}'`);
    })
  }
  else
    next();
}

const checkCommunityRequisition = (req, res, next) => {
  if (req.params.communityReqId) {
    const communityReqId = req.params.communityReqId;
    communityRequisition.isExist(communityReqId).then(result => {
      if (result) {
        req.communityReqId = communityReqId;
        next();
      }
      else
        return http.notFound(req, res, `community requisition '${communityReqId}'`);
    })
  }
  else
    next();
}

const checkHouseholdRequisition = (req, res, next) => {
  if (req.params.householdReqId) {
    const householdReqId = req.params.householdReqId;
    householdRequisition.isExist(householdReqId).then(result => {
      if (result) {
        req.householdReqId = householdReqId;
        next();
      }
      else
        return http.notFound(req, res, `household requisition '${householdReqId}'`);
    })
  }
  else
    next();
}

const checkHouseholdRequisitionInCommunity = (req, res, next) => {
  if (req.params.communityId && req.params.householdReqId) {
    const communityId = req.params.communityId;
    const householdReqId = req.params.householdReqId;
    householdRequisition.isExistInCommunity(communityId, householdReqId).then(result => {
      if (result) {
        req.communityId = communityId;
        req.householdReqId = householdReqId;
        next();
      }
      else
        return http.notFound(req, res, `community '${communityId}' household requisition '${householdReqId}'`);
    })
  }
  else
    next();
}

const checkMemberInCommunity = (req, res, next) => {
  if (req.params.communityId && req.params.userId && req.params.role) {
    const communityId = req.params.communityId;
    const userId = req.params.userId;
    const role = req.params.role;
    communityMember.isExist(communityId, role, userId).then(result => {
      if (result) {
        req.communityId = communityId;
        req.userId = userId;
        req.role = role;
        next();
      }
      else
        return http.notFound(req, res, `community '${communityId}' ${role} '${userId}'`);
    })
  }
  else
    next();
}

const checkMemberInHousehold = (req, res, next) => {
  if (req.params.communityId && req.params.householdId && req.params.userId && req.params.role) {
    const communityId = req.params.communityId;
    const householdId = req.params.householdId;
    const userId = req.params.userId;
    const role = req.params.role;
    householdMember.isExist(householdId, role, userId).then(result => {
      if (result) {
        req.communityId = communityId;
        req.householdId = householdId;
        req.userId = userId;
        req.role = role;
        next();
      }
      else
        return http.notFound(req, res, `household '${householdId}' ${role} '${userId}'`);
    })
  }
  else
    next();
}

const checkCommunityRole = (req, res, next) => {
  if (req.params.communityId && req.params.role) {
    const role = req.params.role;
    const communityId = req.params.communityId;
    if (user.isCommunityRoleExist(role)) {
      req.role = role;
      req.communityId = communityId;
      next();
    }
    else
      return http.notFound(req, res, `community role '${role}'`);
  }
  else
    next();
}

const checkHouseholdRole = (req, res, next) => {
  if (req.params.householdId && req.params.role) {
    const householdId = req.params.householdId;
    const role = req.params.role;
    if (user.isHouseholdRoleExist(role)) {
      req.householdId = householdId;
      req.role = role;
      next()
    }
    else
      return http.notFound(req, res, `household role '${role}'`);
  }
  else
    next();
}

const checkInvitation = (req, res, next) => {
  if (req.params.invitationId) {
    const invitationId = req.params.invitationId;
    invitation.isExist(invitationId).then(result => {
      if (result) {
        req.invitationId = invitationId;
        next();
      }
      else
        return http.notFound(req, res, `invitation '${invitationId}'`);
    })
  }
  else
    next();
}

const checkCommunityRoleInvitation = (req, res, next) => {
  if (req.params.invitationId && req.params.role && req.params.communityId) {
    const invitationId = req.params.invitationId;
    const role = req.params.role;
    const communityId = req.params.communityId;
    invitation.isExistInCommunity(invitationId, role, communityId).then(result => {
      if (result) {
        req.invitationId = invitationId;
        req.role = role;
        req.communityId = communityId;
        next();
      }
      else
        return http.notFound(req, res, `community '${communityId}' ${role} invitation '${invitationId}'`);
    })
  }
  else
    next();
}

const checkHouseholdRoleInvitation = (req, res, next) => {
  if (req.params.invitationId && req.params.role && req.params.communityId && req.params.householdId) {
    const invitationId = req.params.invitationId;
    const role = req.params.role;
    const communityId = req.params.communityId;
    const householdId = req.params.householdId;
    invitation.isExistInHousehold(invitationId, role, householdId).then(result => {
      if (result) {
        req.invitationId = invitationId;
        req.role = role;
        req.communityId = communityId;
        req.householdId = householdId;
        next();
      }
      else
        return http.notFound(req, res, `household '${householdId}' ${role} invitation '${invitationId}'`);
    })
  }
  else
    next();
}

const checkPackageInHousehold = (req, res, next) => {
  if (req.params.householdId && req.params.packageId) {
    const householdId = req.params.householdId;
    const packageId = req.params.packageId;
    package.isExistInHousehold(householdId, packageId).then(result => {
      if (result) {
        req.householdId = householdId;
        req.packageId = packageId;
        next();
      }
      else
        return http.notFound(req, res, `household '${householdId}' package '${packageId}'`);
    })
  }
  else
    next();
}

router.use('/user/roles/community/:communityId*', checkCommunity);
router.use('/user/roles/community/:communityId/household/:householdId*', checkHouseholdInCommunity);
router.use('/user/permissions/community/:communityId*', checkCommunity);
router.use('/user/permissions/community/:communityId/role/:role*', checkCommunityRole);
router.use('/user/permissions/community/:communityId/household/:householdId*', checkHouseholdInCommunity);
router.use('/user/permissions/community/:communityId/household/:householdId/role/:role*', checkHouseholdRole);
router.use('/user/communityRequisitions/:communityReqId*', checkCommunityRequisition);
router.use('/user/householdRequisitions/:householdReqId*', checkHouseholdRequisition);
router.use('/user/invitations/:invitationId*', checkInvitation);
router.use('/user/communities/:communityId*', checkCommunity);

router.use('/communities/:communityId*', checkCommunity);
router.use('/communitiesDetail/:communityId*', checkCommunity);
router.use('/communities/:communityId/role/:role*', checkCommunityRole);
router.use('/communities/:communityId/role/:role/invitations/:invitationId*', checkCommunityRoleInvitation);
router.use('/communities/:communityId/households/:householdId*', checkHouseholdInCommunity);
router.use('/communities/:communityId/householdsDetail/:householdId*', checkHouseholdInCommunity);
router.use('/communities/:communityId/households/:householdId/role/:role*', checkHouseholdRole);
router.use('/communities/:communityId/households/:householdId/role/:role/invitations/:invitationId*', checkHouseholdRoleInvitation);
router.use('/communities/:communityId/householdRequisitions/:householdReqId*', checkHouseholdRequisitionInCommunity);
router.use('/communities/:communityId/role/:role/members/:userId*', checkMemberInCommunity);
router.use('/communities/:communityId/households/:householdId/role/:role/members/:userId*', checkMemberInHousehold);
router.use('/communities/:communityId/households/:householdId/packages/:packageId*', checkPackageInHousehold);

module.exports = router;