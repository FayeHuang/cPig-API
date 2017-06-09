const admin = require('firebase-admin');
const db = admin.database();
const merge = require("deepmerge");
const user = require("./user");
const householdMember = require("./householdMember")

const getOne = (communityId, id) => {
  return db.ref(`Households/${communityId}/${id}`).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val()) {
      var process = [];
      const createUserId = snapshot.val().createUser;
      process.push( user.getOne(createUserId) );
      result = Object.assign({id:id},snapshot.val());
      return Promise.all(process).then(data => {
        result.createUser = data[0];
        return result;
      });
    }
    else
      return result;
  })
}

const _mergeAll = (communityId, householdIds) => {
  const process = householdIds.map(id => getOne(communityId, id));
  return Promise.all(process).then(data => {
    return [].concat(data);
  });
}

const getAll = (communityId) => {
  return db.ref(`Households/${communityId}`).once('value').then(snapshot => {
    return snapshot.val() ? _mergeAll( communityId, Object.keys(snapshot.val()) ):[];
  })
}

const getOwn = (communityId, uid) => {
  return db.ref(`UserRoles/${uid}/households/${communityId}`).once('value').then(snapshot => {
    return snapshot.val() ? _mergeAll( communityId, Object.keys(snapshot.val()) ):[];
  })
}

const isExistInCommunity = (communityId, id) => {
  return db.ref(`Households/${communityId}/${id}`).once('value').then(snapshot => {
    if (snapshot.val())
      return true;
    else
      return false;
  })
}

const isOwner = (communityId, id, ownerId) => {
  return db.ref(`UserRoles/${ownerId}/households/${communityId}/${id}`).once('value').then(snapshot => {
    if (snapshot.val())
      return true;
    else
      return false;
  })
}

// ----- user dashboard page -----

const getRoleDetail = (uid, communityId, householdId) => {
  return db.ref(`UserRoles/${uid}/households/${communityId}/${householdId}`).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val()) {
      var process = [];
      result.roles = Object.keys(snapshot.val())
      process.push( getOne(communityId, householdId) );
      
      return Promise.all(process).then(data => {
        data.push(result)
        return merge.all(data);
      });
    }
    else
      return result;
  })
}

const getRoleDetailInCommunity = (uid, communityId) => {
  return db.ref(`UserRoles/${uid}/households/${communityId}`).once('value').then(snapshot => {
    if (snapshot.val()) {
      const process = Object.keys(snapshot.val()).map(id => getRoleDetail(uid, communityId, id));
      return Promise.all(process).then(data => {
        return [].concat(data);
      });
    }
    else
      return [];
  })
}

// ----- household detail page -----

const getMemberDetail = (communityId, householdId) => {
  return db.ref(`Households/${communityId}/${householdId}`).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val()) {
      var process = [];
      process.push( getOne(communityId, householdId) );
      process.push( householdMember.getAll(householdId, 'RESIDENT_ADMIN') );
      process.push( householdMember.getAll(householdId, 'RESIDENT') );
      
      return Promise.all(process).then(data => {
        result = data[0];
        result.RESIDENT_ADMIN = data[1];
        result.RESIDENT = data[2];
        return result;
      });
    }
    else
      return result;
  })
}

const getOwnMemberDetail = (communityId, uid) => {
  return db.ref(`UserRoles/${uid}/households/${communityId}`).once('value').then(snapshot => {
    if (snapshot.val()) {
      const process = Object.keys(snapshot.val()).map(id => getMemberDetail(communityId, id));
      return Promise.all(process).then(data => {
        return [].concat(data);
      });
    }
    else
      return [];
  })
}

const getAllMemberDetail = (communityId) => {
  return db.ref(`Households/${communityId}`).once('value').then(snapshot => {
    if (snapshot.val()) {
      const process = Object.keys(snapshot.val()).map(id => getMemberDetail(communityId, id));
      return Promise.all(process).then(data => {
        return [].concat(data);
      });
    }
    else
      return [];
  })
}

module.exports = {
  getAll: getAll,
  getOwn: getOwn,
  getOne: getOne,
  isExistInCommunity: isExistInCommunity,
  isOwner: isOwner,
  getRoleDetail: getRoleDetail,
  getRoleDetailInCommunity: getRoleDetailInCommunity,
  getMemberDetail: getMemberDetail,
  getOwnMemberDetail: getOwnMemberDetail,
  getAllMemberDetail: getAllMemberDetail,
}