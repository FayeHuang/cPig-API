const admin = require('firebase-admin');
const db = admin.database();

const getOne = (id) => {
  return db.ref(`Users/${id}`).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val()) {
      var data = snapshot.val();
      delete data.isPublic
      result = Object.assign({id:id},data);
    }
    return result;
  })
}

const getAll = () => {
  return db.ref(`Users`).once('value').then(snapshot => {
    var result = [];
    if (snapshot.val()) {
      snapshot.forEach(childSnapshot => {
        var data = childSnapshot.val();
        delete data.isPublic;
        data.id = childSnapshot.key;
        result.push(data);
      })
    }
    return result;
  })
}

const getRoles = (id) => {
  return db.ref(`UserRoles/${id}/system`).once('value').then(snapshot => {
    if (snapshot.val())
      return snapshot.val();
    else
      return {};
  })
}

const getRolesInCommunity = (id, communityId) => {
  return db.ref(`UserRoles/${id}/communities/${communityId}`).once('value').then(snapshot => {
    if (snapshot.val())
      return snapshot.val();
    else
      return {};
  })
}

const getRolesInHousehold = (id, communityId, householdId) => {
  return db.ref(`UserRoles/${id}/households/${communityId}/${householdId}`).once('value').then(snapshot => {
    if (snapshot.val())
      return snapshot.val();
    else
      return {};
  })
}

const isExist = (id) => {
  return db.ref(`Users/${id}`).once('value').then(snapshot => {
    if (snapshot.val())
      return snapshot.val()
    else
      return false;
  })
}

const isCommunityRoleExist = (role) => {
  if (role === 'COMMUNITY_ADMIN' || role === 'GUARD')
    return true;
  else
    return false;
}

const isHouseholdRoleExist = (role) => {
  if (role === 'RESIDENT' || role === 'RESIDENT_ADMIN')
    return true;
  else
    return false;
}

module.exports = {
  getOne: getOne,
  getAll: getAll,
  getRoles: getRoles,
  getRolesInCommunity: getRolesInCommunity,
  getRolesInHousehold: getRolesInHousehold,
  isExist: isExist,
  isCommunityRoleExist: isCommunityRoleExist,
  isHouseholdRoleExist: isHouseholdRoleExist,
}