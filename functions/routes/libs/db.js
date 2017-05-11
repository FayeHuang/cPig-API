const admin = require('firebase-admin');
const db = admin.database();

/*
// Communities
// CommunitySNs
// CommunityRequisitions
// CommunityPermissions
// CommunityMembers
// GuardInviteCodes
// CommunityAdminInviteCodes
// InvitedCommunityAdmins
// InvitedGuards
// Householders
// HouseholderRequisitions
// HouseholderMembers
// HouseholderPermissions
// ResidentInviteCodes
// ResidentAdminInviteCodes
// InvitedResidents
// InvitedResidentAdmins
// Invitations
// InviteCodes
// Announcements
// Packages
// PackageReceiveCodes
// UserRoles
// Users
// SystemAdmins
*/

exports.getAllCommunityRequisitions = () => {
  return db.ref(`CommunityRequisitions`).once('value').then(snapshot => {
    return snapshot.val();
  })
}

exports.getUserCommunityRequisitions = (uid) => {
  return db.ref(`CommunityRequisitions`).orderByChild('createUser').equalTo(uid).once('value').then(snapshot => {
    return snapshot.val();
  })
}