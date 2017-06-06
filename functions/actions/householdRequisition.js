const admin = require('firebase-admin');
const db = admin.database();
const merge = require("deepmerge");

const randomstring = require("../routes/libs/randomstring");
const householdMember = require("./householdMember");
const household = require("./household");


const _getCommunity = (householdReqId, communityId) => {
  return db.ref(`Communities/${communityId}`).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val()) {
      result[householdReqId] = {community:{}};
      result[householdReqId]['community'][communityId] = snapshot.val();
    }
    return result;
  })
}

const _getUser = (householdReqId, uid) => {
  return db.ref(`Users/${uid}`).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val())
      result[householdReqId] = {
        createUser: Object.assign({id:uid},snapshot.val())
      };
    return result;
  })
}

const getOne = (id) => {
  return db.ref(`HouseholdRequisitions/${id}`).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val()) {
      var process = [];
      var data = snapshot.val();
      process.push( _getCommunity(id, data.community) );
      process.push( _getUser(id, data.createUser) );
      delete data.community;
      delete data.createUser;
      result[id] = data;
      
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

const _mergeAll = (householdIds) => {
  const process = householdIds.map(id => getOne(id));
  return Promise.all(process).then(data => {
    return data.length > 1 ? merge.all(data):data[0];
  });
}

const getAll = () => {
  return db.ref(`HouseholdRequisitions`).once('value').then(snapshot => {
    return snapshot.val() ? _mergeAll( Object.keys(snapshot.val()) ) : {};
  })
}

const getOwn = (ownerId) => {
  return db.ref(`HouseholdRequisitions`).orderByChild('createUser').equalTo(ownerId).once('value').then(snapshot => {
    return snapshot.val() ? _mergeAll( Object.keys(snapshot.val()) ) : {};
  })
}

const getAllInCommunity = (communityId) => {
  return db.ref(`HouseholdRequisitions`).orderByChild('community').equalTo(communityId).once('value').then(snapshot => {
    return snapshot.val() ? _mergeAll( Object.keys(snapshot.val()) ) : {};
  })
}

const getOwnInCommunity = (communityId, uid) => {
  return db.ref(`HouseholdRequisitions`).orderByChild('community').equalTo(communityId).once('value').then(snapshot => {
    if (snapshot.val()) {
      var list = [];
      snapshot.forEach(childSnapshot => {
        const createUser = childSnapshot.val().createUser;
        const id = childSnapshot.key;
        if (createUser === uid)
          list.push(id);
      })
      return list.length > 0 ? _mergeAll(list):{};
    }
    else
      return {};
  })
}

const create = (data) => {
  const id = randomstring.uuid();
  return db.ref(`HouseholdRequisitions/${id}`).set(data).then(() => {
    return getOne(id);
  }).then(result => {
    return result;
  })
}

const remove = (id) => {
  return db.ref(`HouseholdRequisitions/${id}`).remove().then(() => {
    return true;
  })
}

const isExist = (id) => {
  return db.ref(`HouseholdRequisitions/${id}`).once('value').then(snapshot => {
    if (snapshot.val())
      return snapshot.val();
    else
      return false;
  })
}

const isExistInCommunity = (communityId, id) => {
  return db.ref(`HouseholdRequisitions/${id}`).once('value').then(snapshot => {
    if (snapshot.val() && snapshot.val().community === communityId)
      return snapshot.val();
    else
      return false;
  })
}

const isOwner = (id, ownerId) => {
  return db.ref(`HouseholdRequisitions/${id}`).once('value').then(snapshot => {
    if (snapshot.val().createUser === ownerId)
      return true;
    else
      return false;
  })
}

const verify = (id) => {
  return getOne(id).then(result => {
    const householdId = randomstring.uuid();
    const floor = result[id].floor;
    const number = result[id].number;
    const targetUser = result[id].createUser;
    const communityId = result[id].community;
    return db.ref(`CommunityPermissions/${communityId}/RESIDENT_ADMIN`).once('value').then(snapshot => {
      var updates = {};
      updates[`/Households/${communityId}/${householdId}`] = {number:number, floor:floor};
      updates[`/HouseholdPermissions/${householdId}/${targetUser}`] = snapshot.val();
      return db.ref().update(updates);
    }).then(() => {
      // 將 household requisition 的建立人設定為新住戶的管理員
      return householdMember._addMember(communityId, householdId, 'RESIDENT_ADMIN', targetUser)
    }).then(() => {
      // 刪除社區申請單
      return remove(id)
    }).then(result => {
      // 查詢新住戶資料
      return household.getOne(communityId, householdId);
    }).then(result => {
      return result;
    })
  })
}

module.exports = {
  getAllInCommunity: getAllInCommunity,
  getOwnInCommunity: getOwnInCommunity,
  getAll: getAll,
  getOwn: getOwn,
  getOne: getOne,
  create: create,
  remove: remove,
  isExist: isExist,
  isExistInCommunity: isExistInCommunity,
  isOwner: isOwner,
  verify: verify,
}
