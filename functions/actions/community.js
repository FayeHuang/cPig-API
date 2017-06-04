const admin = require('firebase-admin');
const db = admin.database();
const merge = require("deepmerge");

const getCommunityBySN = (sn) => {
  return db.ref(`CommunitySNs`).orderByChild('sn').equalTo(sn).once('value').then(snapshot => {
    if (snapshot.val()) {
      const communityId = Object.keys(snapshot.val())[0];
      return getOne(communityId).then(result => { return result })
    }
    else
      return false
  })
}

const getAll = () => {
  return db.ref(`Communities`).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val())  
      result = snapshot.val();
    return result;
  })
}

const getOwn = (uid) => {
  return db.ref(`UserRoles/${uid}/communities`).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val()) {
      var process = [];
      snapshot.forEach(childSnapshot => {
        const communityId = childSnapshot.key;
        process.push( getOne(communityId) );
      })
      
      return Promise.all(process).then(data => {
        if (data.length === 1)
          result = data[0];
        else
          result = merge.all(data);
        return result;
      });
    }
    else
      return result;
  })
}

const getOne = (id) => {
  return db.ref(`Communities/${id}`).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val())
      result[id] = snapshot.val();
    return result;
  })
}

const getSN = (id) => {
  return db.ref(`CommunitySNs/${id}`).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val())
      result[id] = snapshot.val();
    return result;
  })
}

const getRolePermission = (id, role) => {
  return db.ref(`CommunityPermissions/${id}/${role}`).once('value').then(snapshot => {
    if (snapshot.val())
      return snapshot.val()
    else
      return {};
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
      return snapshot.val();
    else
      return false;
  })
}

const isOwner = (id, ownerId) => {
  return db.ref(`UserRoles/${ownerId}/communities/${id}`).once('value').then(snapshot => {
    if (snapshot.val())
      return snapshot.val();
    else
      return false;
  })
}

const getHousehold = (communityId, householdId) => {
  return db.ref(`Households/${communityId}/${householdId}`).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val()) {
      result[communityId] = {households:{}};
      result[communityId]['households'][householdId] = snapshot.val();
    }
    return result;
  })
}

const getHouseholdDetail = (uid, communityId) => {
  return db.ref(`UserRoles/${uid}/households/${communityId}`).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val()) {
      var process = [];
      result[communityId] = {households:{}};
      snapshot.forEach(childSnapshot => {
        const householdId = childSnapshot.key;
        result[communityId]['households'][householdId] = {roles:childSnapshot.val()};
        process.push( getHousehold(communityId, householdId) );
      })
      
      return Promise.all(process).then(data => {
        data.push(result);
        result = merge.all(data);
        return result;
      });
    }
    else
      return result;
  })  
}

const getDetail = (uid) => {
  return db.ref(`UserRoles/${uid}/communities`).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val()) {
      var process = [];
      snapshot.forEach(childSnapshot => {
        const communityId = childSnapshot.key;
        result[communityId] = {roles:childSnapshot.val()};
        process.push( getHouseholdDetail(uid, communityId) );
        process.push( getOne(communityId) );
      })
      
      return Promise.all(process).then(data => {
        data.push(result);
        result = merge.all(data);
        return result;
      });
    }
    else
      return result;
  })
}

module.exports = {
  getAll: getAll,
  getOne: getOne,
  getOwn: getOwn,
  getSN: getSN,
  getCommunityBySN: getCommunityBySN,
  getRolePermission: getRolePermission,
  getDetail: getDetail,
  modify: modify,
  isExist: isExist,
  isOwner: isOwner,
}

