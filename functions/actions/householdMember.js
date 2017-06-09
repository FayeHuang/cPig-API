const admin = require('firebase-admin');
const db = admin.database();
const user = require("./user");

const _addMember = (communityId, householdId, role, uid) => {
  var updates = {};
  updates[`/CommunityMembers/${communityId}/${role}/${uid}`] = true;
  updates[`/UserRoles/${uid}/communities/${communityId}/${role}`] = true;
  updates[`/HouseholdMembers/${householdId}/${role}/${uid}`] = true;
  updates[`/UserRoles/${uid}/households/${communityId}/${householdId}/${role}`] = true;
  
  return db.ref(`CommunityPermissions/${communityId}/${role}`).once('value').then(snapshot => {
    updates[`/HouseholdPermissions/${householdId}/${uid}`] =  snapshot.val();
    return db.ref().update(updates);
  })
}

const getOne = (userId) => {
  return user.getOne(userId)
}

const _mergeAll = (userIds) => {
  const process = userIds.map(id => getOne(id));
  return Promise.all(process).then(data => {
    return [].concat(data);
  });
}

const getAll = (householdId, role) => {
  return db.ref(`HouseholdMembers/${householdId}/${role}`).once('value').then(snapshot=> {
    return snapshot.val() ? _mergeAll( Object.keys(snapshot.val())):[];
  })
}

const getOwn = (householdId, role, ownerId) => {
  return db.ref(`HouseholdMembers/${householdId}/${role}/${ownerId}`).once('value').then(snapshot => {
    if (snapshot.val())
      return getOne(ownerId);
    else
      return {};
  })
}

const remove = (communityId, householdId, role, userId) => {
  var updates = {};
  
  updates[`/CommunityMembers/${communityId}/${role}/${userId}`] = null;
  updates[`/UserRoles/${userId}/communities/${communityId}/${role}`] = null;
  updates[`/HouseholdMembers/${householdId}/${role}/${userId}`] = null;
  updates[`/UserRoles/${userId}/households/${communityId}/${householdId}/${role}`] = null;
  updates[`/HouseholdPermissions/${householdId}/${userId}`] = null;
  
  return db.ref().update(updates);
}

const isExist = (householdId, role, userId) => {
  return db.ref(`HouseholdMembers/${householdId}/${role}/${userId}`).once('value').then(snapshot => {
    if (snapshot.val())
      return true;
    else
      return false;
  })
}

module.exports = {
  _addMember: _addMember,
  getAll: getAll,
  getOwn: getOwn,
  getOne: getOne,
  remove: remove,
  isExist: isExist,
}