const admin = require('firebase-admin');
const db = admin.database();
const user = require("./user");
const household = require("./household");
const communityMember = require("./communityMember");

const getOne = (id) => {
  return db.ref(`Communities/${id}`).once('value').then(snapshot => {
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

const getCommunityBySN = (sn) => {
  return db.ref(`Communities`).orderByChild('sn').equalTo(sn).once('value').then(snapshot => {
    if (snapshot.val()) {
      const communityId = Object.keys(snapshot.val())[0];
      return getOne(communityId).then(result => { return result })
    }
    else
      return false
  })
}

const _mergeAll = (communityIds) => {
  const process = communityIds.map(id => getOne(id));
  return Promise.all(process).then(data => {
    return [].concat(data);
  });
}

const getAll = () => {
  return db.ref(`Communities`).once('value').then(snapshot => {
    return snapshot.val() ? _mergeAll( Object.keys(snapshot.val()) ):[];
  })
}

const getOwn = (uid) => {
  return db.ref(`UserRoles/${uid}/communities`).once('value').then(snapshot => {
    return snapshot.val() ? _mergeAll( Object.keys(snapshot.val()) ):[];
  })
}

const modify = (id, data) => {
  return db.ref(`Communities/${id}`).update(data).then(() => {
    return getOne(id);
  }).then(result => {
    return result;
  })
}

const isExist = (id) => {
  return db.ref(`Communities/${id}`).once('value').then(snapshot => {
    if (snapshot.val())
      return true;
    else
      return false;
  })
}

const isOwner = (id, ownerId) => {
  return db.ref(`UserRoles/${ownerId}/communities/${id}`).once('value').then(snapshot => {
    if (snapshot.val())
      return true;
    else
      return false;
  })
}

const getRolePermission = (id, role) => {
  return db.ref(`CommunityPermissions/${id}/${role}`).once('value').then(snapshot => {
    if (snapshot.val())
      return snapshot.val();
    else
      return {};
  })
}

// ----- user dashboard page use -----

const getRoleDetail = (uid, communityId) => {
  return db.ref(`UserRoles/${uid}/communities/${communityId}`).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val()) {
      var process = [];
      result.roles = Object.keys(snapshot.val()).filter(role => role !== 'RESIDENT_ADMIN' && role !== 'RESIDENT');
      process.push( getOne(communityId) );
      process.push( household.getRoleDetailInCommunity(uid, communityId) );
      
      return Promise.all(process).then(data => {
        result = Object.assign(data[0],result);
        result.households = data[1];
        return result;
      });
    }
    else
      return result;
  })
}

const getRoleDetailAll = (uid) => {
  return db.ref(`UserRoles/${uid}/communities`).once('value').then(snapshot => {
    if (snapshot.val()) {
      const process = Object.keys(snapshot.val()).map(id => getRoleDetail(uid, id));
      return Promise.all(process).then(data => {
        return [].concat(data);
      });
    }
    else
      return [];
  })
}

// ----- community detail page use -----

const getMemberDetail = (communityId) => {
  return db.ref(`Communities/${communityId}`).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val()) {
      var process = [];
      process.push( getOne(communityId) );
      process.push( communityMember.getAll(communityId, 'COMMUNITY_ADMIN') );
      process.push( communityMember.getAll(communityId, 'GUARD') )
      
      return Promise.all(process).then(data => {
        result = data[0];
        result.COMMUNITY_ADMIN = data[1];
        result.GUARD = data[2];
        return result;
      });
    }
    else
      return result;
  })
}

const getOwnMemberDetail = (uid) => {
  return db.ref(`UserRoles/${uid}/communities`).once('value').then(snapshot => {
    if (snapshot.val()) {
      const process = Object.keys(snapshot.val()).map(id => getMemberDetail(id));
      return Promise.all(process).then(data => {
        return [].concat(data);
      });
    }
    else
      return [];
  })
}

const getAllMemberDetail = () => {
  return db.ref(`Communities`).once('value').then(snapshot => {
    if (snapshot.val()) {
      const process = Object.keys(snapshot.val()).map(id => getMemberDetail(id));
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
  getOne: getOne,
  getOwn: getOwn,
  getCommunityBySN: getCommunityBySN,
  getRolePermission: getRolePermission,
  modify: modify,
  isExist: isExist,
  isOwner: isOwner,
  getRoleDetail: getRoleDetail,
  getRoleDetailAll: getRoleDetailAll,
  getMemberDetail: getMemberDetail,
  getOwnMemberDetail: getOwnMemberDetail,
  getAllMemberDetail: getAllMemberDetail,
}

