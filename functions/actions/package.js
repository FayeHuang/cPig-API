const admin = require('firebase-admin');
const db = admin.database();
const randomstring = require("../routes/libs/randomstring");

const household = require("./household");
const user = require("./user");

const create = (communityId, householdId, createUserId, isLetter) => {
  const createTime = new Date();
  const createTimestamp = createTime.getTime();
  const sn = randomstring.sn();
  const packageId = randomstring.uuid();
  return db.ref(`Packages/${packageId}`).set({
    createUser: createUserId,
  	createTime: createTimestamp,
  	isReceived: false,
  	receiveUser: null,
  	receiveTime: null,
  	isLetter: isLetter ? isLetter:false,
  	signImage: null,
  	isInformed: false,
  	sn: sn,
  	household: householdId,
  	community: communityId,
  }).then(() => {
    return getOne(packageId);
  })
}

const getOne = (packageId, getHouseholdDetail) => {
  const isHousehold = getHouseholdDetail ? getHouseholdDetail:false;
  return db.ref(`Packages/${packageId}`).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val()) {
      var process = [];
      process.push( user.getOne(snapshot.val().createUser) );
      if (isHousehold)
        process.push( household.getOne(snapshot.val().community, snapshot.val().household) );
      if (snapshot.val().receiveUser)
        process.push( user.getOne(snapshot.val().receiveUser) );
      result = Object.assign({id:packageId},snapshot.val());
      
      return Promise.all(process).then(data => {
        result.createUser = data[0];
        if (data.length > 1 ) {
          if (data.length === 3) {
            result.household = data[1];
            result.receiveUser = data[2];
          }
          else if (data.length === 2) {
            if (isHousehold)
              result.household = data[1];
            else
              result.receiveUser = data[1];
          }
        }
        return result;
      });
    }
    else
      return result;
  })
}

const _mergeAll = (packageIds, getHouseholdDetail) => {
  const isHousehold = getHouseholdDetail ? getHouseholdDetail:false;
  const process = packageIds.map(id => getOne(id, isHousehold));
  return Promise.all(process).then(data => {
    return [].concat(data);
  });
}

const getAllInCommunity = (communityId) => {
  return db.ref(`Packages`).orderByChild('community').equalTo(communityId).once('value').then(snapshot => {
    return snapshot.val() ? _mergeAll( Object.keys(snapshot.val()), true ):[];
  })
}

const getAllInHousehold = (householdId) => {
  return db.ref(`Packages`).orderByChild('household').equalTo(householdId).once('value').then(snapshot => {
    return snapshot.val() ? _mergeAll( Object.keys(snapshot.val()) ):[];
  })
}

const modify = (packageId, data) => {
  return db.ref(`Packages/${packageId}`).update(data).then(() => {
    return getOne(packageId);
  })
}

const remove = (packageId) => {
  return db.ref(`Packages/${packageId}`).remove().then(() => {
    return true;
  })
}

const isExistInHousehold = (householdId, packageId) => {
  return db.ref(`Packages/${packageId}`).once('value').then(snapshot => {
    if (snapshot.val() && snapshot.val().household === householdId)
      return true;
    else
      return false;
  })
}

module.exports = {
  create: create,
  getOne: getOne,
  getAllInCommunity: getAllInCommunity,
  getAllInHousehold: getAllInHousehold,
  modify: modify,
  remove: remove,
  isExistInHousehold: isExistInHousehold,
}