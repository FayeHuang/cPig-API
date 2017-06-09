const admin = require('firebase-admin');
const db = admin.database();

const randomstring = require("../routes/libs/randomstring");
const householdMember = require("./householdMember");
const household = require("./household");
const user = require("./user");
const community = require("./community");

const create = (communityId, number, floor, ownerId) => {
  const id = randomstring.uuid();
  const createTime = new Date();
  const createTimestamp = createTime.getTime();
  return db.ref(`HouseholdRequisitions/${id}`).set({
    community:communityId,
    number:number,
    floor:floor,
    owner:ownerId,
    createTime:createTimestamp
  }).then(() => {
    return getOne(id, false);
  }).then(result => {
    return result;
  })
}

const getOne = (id, showCommunityDetail) => {
  const communityDetail = showCommunityDetail ? showCommunityDetail:false;
  return db.ref(`HouseholdRequisitions/${id}`).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val()) {
      var process = [];
      const ownerId = snapshot.val().owner;
      const communityId = snapshot.val().community;
      process.push( user.getOne(ownerId) );
      if (communityDetail)
        process.push( community.getOne(communityId) );
      result = Object.assign({id:id},snapshot.val());
      
      return Promise.all(process).then(data => {
        result.owner = data[0];
        if (communityDetail)
          result.community = data[1];
        return result;
      });
    }
    else
      return result;
  })
}

const _mergeAll = (householdIds, showCommunityDetail) => {
  const communityDetail = showCommunityDetail ? showCommunityDetail:false;
  const process = householdIds.map(id => getOne(id, communityDetail));
  return Promise.all(process).then(data => {
    return [].concat(data);
  });
}

const getAll = () => {
  return db.ref(`HouseholdRequisitions`).once('value').then(snapshot => {
    return snapshot.val() ? _mergeAll( Object.keys(snapshot.val()), true):[];
  })
}

const getOwn = (ownerId) => {
  return db.ref(`HouseholdRequisitions`).orderByChild('owner').equalTo(ownerId).once('value').then(snapshot => {
    return snapshot.val() ? _mergeAll( Object.keys(snapshot.val()), true):[];
  })
}

const getAllInCommunity = (communityId) => {
  return db.ref(`HouseholdRequisitions`).orderByChild('community').equalTo(communityId).once('value').then(snapshot => {
    return snapshot.val() ? _mergeAll( Object.keys(snapshot.val()), false):[];
  })
}

const getOwnInCommunity = (communityId, ownerId) => {
  return db.ref(`HouseholdRequisitions`).orderByChild('community').equalTo(communityId).once('value').then(snapshot => {
    if (snapshot.val()) {
      var list = [];
      snapshot.forEach(childSnapshot => {
        if (ownerId === childSnapshot.val().owner)
          list.push(childSnapshot.key);
      })
      return list.length > 0 ? _mergeAll(list, false):[];
    }
    else
      return [];
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
      return true;
    else
      return false;
  })
}

const isExistInCommunity = (communityId, id) => {
  return db.ref(`HouseholdRequisitions/${id}`).once('value').then(snapshot => {
    if (snapshot.val() && snapshot.val().community === communityId)
      return true;
    else
      return false;
  })
}

const isOwner = (id, ownerId) => {
  return db.ref(`HouseholdRequisitions/${id}`).once('value').then(snapshot => {
    if (snapshot.val().owner === ownerId)
      return true;
    else
      return false;
  })
}

const verify = (id) => {
  return getOne(id, false).then(result => {
    const householdId = randomstring.uuid();
    const floor = result.floor;
    const number = result.number;
    const targetUser = result.owner.id;
    const communityId = result.community;
    const createTime = new Date();
    const createTimestamp = createTime.getTime();
    return db.ref(`CommunityPermissions/${communityId}/RESIDENT_ADMIN`).once('value').then(snapshot => {
      var updates = {};
      updates[`/Households/${communityId}/${householdId}`] = {
        number:number, 
        floor:floor, 
        createUser:targetUser,
        createTime:createTimestamp,
      };
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
