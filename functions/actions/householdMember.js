const admin = require('firebase-admin');
const db = admin.database();
const community = require("./community");
const merge = require("deepmerge");

const user = require("./user");

const _addMember = (communityId, householdId, role, uid) => {
  var updates = {};
  updates[`/CommunityMembers/${communityId}/${role}/${uid}`] = true;
  updates[`/UserRoles/${uid}/communities/${communityId}/${role}`] = true;
  updates[`/HouseholdMembers/${householdId}/${role}/${uid}`] = true;
  updates[`/UserRoles/${uid}/households/${communityId}/${householdId}/${role}`] = true;
  
  return community.getRolePermission(communityId, role).then(result => {
    updates[`/HouseholdPermissions/${householdId}/${uid}`] = result;
    return db.ref().update(updates);
  })
}

const getAll = (householdId, role) => {
  return db.ref(`HouseholdMembers/${householdId}/${role}`).once('value').then(snapshot=> {
    var result = {};
    if (snapshot.val()) {
      var process = [];
      snapshot.forEach(childSnapshot => {
        const userId = childSnapshot.key;
        process.push(user.getOne(userId));
      })
      
      return Promise.all(process).then(data => {
        if (process.length === 1)
          result = data[0]
        else
          result = merge.all(data)
        return result
      })
    }
    else
      return result;
  })
}

const getOwn = (householdId, role, ownerId) => {
  return db.ref(`HouseholdMembers/${householdId}/${role}/${ownerId}`).once('value').then(snapshot => {
    if (snapshot.val())
      return user.getOne(ownerId);
    else
      return {};
  })
}

const getOne = (userId) => {
  return user.getOne(userId)
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
      return snapshot.val();
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