const admin = require('firebase-admin');
const db = admin.database();
const randomstring = require("../routes/libs/randomstring");

const package = require("./package");
const user = require("./user");

const create = (userId, packageId) => {
  const createTime = new Date();
  const createTimestamp = createTime.getTime();
  const expiredTimestamp = createTime.setMinutes(createTime.getMinutes() + 5);
  const code = randomstring.code();
  
  return db.ref(`PackageReceiveCodes/${userId}${packageId}`).set({
    code: code,
	  createTime: createTimestamp,
		expiredTime: expiredTimestamp,
		user: userId,
		package: packageId,
  }).then(() => {
    return getOne(userId, packageId)
  })
}

const getOne = (userId, packageId) => {
  return db.ref(`PackageReceiveCodes/${userId}${packageId}`).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val()) {
      var process = [];
      process.push( package.getOne(packageId) );
      process.push( user.getOne(userId) );
      result = snapshot.val();
      return Promise.all(process).then(data => {
        result.package = data[0];
        result.user = data[1];
        
        return result;
      });
    }
    else
      return result;
  })
}

const remove = (userId, packageId) => {
  return db.ref(`PackageReceiveCodes/${userId}${packageId}`).remove().then(() => {
    return true;
  })
}

const verify = (code) => {
  return db.ref(`PackageReceiveCodes`).orderByChild('code').equalTo(code).once('value').then(snapshot => {
    if (snapshot.val()) {
      const id = Object.keys(snapshot.val())[0];
      return getOne(snapshot.val()[id].user, snapshot.val()[id].package);
    }
    else
      false;
  })
}


module.exports = {
  create: create,
  getOne: getOne,
  remove: remove,
  verify: verify,
}