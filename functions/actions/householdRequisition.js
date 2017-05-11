const admin = require('firebase-admin');
const db = admin.database();

const randomstring = require("../routes/libs/randomstring");
const householdMember = require("./householdMember");
const household = require("./household");


const getAll = () => {
  return db.ref(`HouseholdRequisitions`).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val())  
      result = snapshot.val();
    return result;
  })
}

const getOwn = (ownerId) => {
  return db.ref(`HouseholdRequisitions`).orderByChild('createUser').equalTo(ownerId).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val())  
      result = snapshot.val();
    return result;
  })
}

const getAllInCommunity = (communityId) => {
  return db.ref(`HouseholdRequisitions`).orderByChild('community').equalTo(communityId).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val())  
      result = snapshot.val();
    return result;
  })
}

const getOwnInCommunity = (communityId, uid) => {
  return db.ref(`HouseholdRequisitions`).orderByChild('community').equalTo(communityId).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val()) {
      snapshot.forEach(childSnapshot => {
        const createUser = childSnapshot.val().createUser;
        const id = childSnapshot.key;
        if (createUser === uid)
          result[id] = childSnapshot.val();
      })
    }
    return result;
  })
}

const getOne = (id) => {
  return db.ref(`HouseholdRequisitions/${id}`).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val())
      result[id] = snapshot.val();
    return result;
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
