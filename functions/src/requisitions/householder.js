const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const uuid = require("../libs/uuid");
const admin = require('firebase-admin');

const ref = admin.database().ref('HouseholderRequisitions');


// ===================== /householder =====================

router.route('/householder')
.post((req, res) => {
  if (!req.body.hasOwnProperty('communityId') ||
    !req.body.hasOwnProperty('number') ||
    !req.body.hasOwnProperty('floor') )
    http.badRequest(req, res);
  
  
  const communityId = req.body.communityId;
  const number = req.body.number;
  const floor = req.body.floor;
  var process = null;
  
  // 新增住戶申請單
  try {
    if (req.user.permission.HouseholderRequisitions.create) {
      process = admin.database().ref(`Communities/${communityId}`).once('value').then(snapshot => {
        return snapshot.val();
      }).then(community => {
        if (community) {
          const householderReqId = uuid();
          ref.child(householderReqId).set({
            number: number,
            floor: floor,
            createUser: req.user.uid,
            community: communityId
          }).then(() => {
            res.json({
              success: true, 
              message: {householderReqId:householderReqId}
            })
          })
        } else {
          http.badRequest(req, res);
        }
      })
      .catch(error => http.internalServerError(req, res, error));
    }
  } catch(e) {
    console.log(`[POST /requisitions/householder ] ${e}`);
  }
  
  if (!process)
    http.permissionDenied(req, res);
})
.get((req, res) => {
  var process = null;
  
  // 取得所有住戶申請單
  try {
    if (req.user.permission.HouseholderRequisitions.other.read) {
      process = ref.once('value').then((snapshot) => {
        var result = {success:true, message:{}};
        snapshot.forEach((childSnapshot) => {
          result['message'][childSnapshot.key] = childSnapshot.val()
        })
        res.json(result);
      })
      .catch(error => http.internalServerError(req, res, error));
    }
  } catch(e) {
    console.log(`[GET /requisitions/householder ] ${e}`);
  }
  
  // 取得使用者的住戶申請單
  try {
    if (!process && req.user.permission.HouseholderRequisitions.own.read) {
      process = ref.orderByChild('createUser').equalTo(req.user.uid).once('value').then(snapshot => {
        var result = {success:true, message:{}};
        snapshot.forEach((childSnapshot) => {
          result['message'][childSnapshot.key] = childSnapshot.val();
        })
        res.json(result);
      })
      .catch(error => http.internalServerError(req, res, error)); 
    }
  } catch(e) {
    console.log(`[GET /requisitions/householder ] ${e}`);
  }
  
  if (!process)
    http.permissionDenied(req, res);
})
.all((req, res) => http.methodNotAllowed(req, res));


// ===================== /householder/:householderReqId =====================


router.route('/householder/:householderReqId')
.all((req, res, next) => {
  
  ref.child(req.params.householderReqId).once('value').then(snapshot => {
    if (snapshot.val())
      next();
    else
      http.notFound(req, res);
  })
  .catch(error => http.internalServerError(req, res, error));
  
})
.get((req, res) => {
  var process = null;
  
  // 取得指定住戶申請單資料 (可以讀其他人的) 
  try {
    if (req.user.permission.HouseholderRequisitions.other.read) {
      process = ref.child(req.params.householderReqId).once('value').then(snapshot => {
        var result = {success:true, message:{}};
        result.message[snapshot.key] = snapshot.val();
        res.json(result);
      }).catch(error => 
        http.internalServerError(req, res, error)
      ); 
    }
  } catch(e) {
    console.log(`[GET /requisitions/householder/:householderReqId ] ${e}`);
  }
  
  // 取得指定住戶申請單資料 (只能讀自己的) 
  try {
    if (!process && req.user.permission.HouseholderRequisitions.own.read) {
      process = ref.child(req.params.householderReqId).once('value').then(snapshot => {
        if (snapshot.val().createUser === req.user.uid) {
          var result = {success:true, message:{}};
          result.message[snapshot.key] = snapshot.val();
          res.json(result);
        }
        else {
          http.permissionDenied(req, res);
        }
      })
      .catch(error => http.internalServerError(req, res, error));
    }
  } catch(e) {
    console.log(`[GET /requisitions/householder/:householderReqId ] ${e}`);
  }
  
  if (!process)
    http.permissionDenied(req, res);
    
})
.delete((req, res) => {
  var process = null;
  
  // 刪除指定住戶申請單 (可以刪除其它人的)
  try {
    if (req.user.permission.HouseholderRequisitions.other.delete) {
      process = ref.child(req.params.householderReqId).remove().then(() => {
        res.json({
          success:true, 
          message: {householderReqId:req.params.householderReqId}
        });
      })
      .catch(error => http.internalServerError(req, res, error));
    }
  } catch(e) {
    console.log(`[DELETE /requisitions/householder/:householderReqId ] ${e}`);
  }
  
  // 刪除指定住戶申請單 (只能刪除自己的)
  try {
    if (!process && req.user.permission.HouseholderRequisitions.own.delete) {
      process = ref.child(req.params.householderReqId).once('value').then(snapshot => {
        if (snapshot.val().createUser === req.user.uid) {
          ref.child(req.params.householderReqId).remove().then(() => {
            res.json({
              success:true, 
              message: {householderReqId:req.params.householderReqId}
            });
          })
          .catch(error => http.internalServerError(req, res, error));
        } else {
          http.permissionDenied(req, res);
        }
      })
    }
  } catch(e) {
    console.log(`[DELETE /requisitions/householder/:householderReqId ] ${e}`);
  }
  
  if (!process)
    http.permissionDenied(req, res);
})
.all((req, res) => http.methodNotAllowed(req, res));


// ===================== /householder/:householderReqId/verify =====================

router.route('/householder/:householderReqId/verify')
.all((req, res, next) => {
  
  ref.child(req.params.householderReqId).once('value').then(snapshot => {
    if (snapshot.val())
      next();
    else
      http.notFound(req, res);
  })
  .catch(error => http.internalServerError(req, res, error));
  
})
.post((req, res) => {
  var process = null;
  // 指定住戶申請單審核通過
  try {
    if (req.user.permission.HouseholderRequisitions.verify) {
      process = ref.child(req.params.householderReqId).once('value').then(snapshot => {
        const communityId = snapshot.val().community;
        const number = snapshot.val().number;
        const floor = snapshot.val().floor;
        const createUser = snapshot.val().createUser;
        
        return admin.database().ref(`CommunityPermissions/${communityId}/RESIDENT_ADMIN`).once('value').then(snapshot => {
          return {
            communityId: communityId, 
            number: number, 
            floor: floor,
            createUser: createUser, 
            householderId: uuid(),
            permission: snapshot.val()
          }
        })
      }).then(data => {
        var updates = {};
        updates[`/Householders/${data.communityId}/${data.householderId}`] = {number:data.number, floor:data.floor};
        updates[`/HouseholderMembers/${data.householderId}/RESIDENT_ADMIN/${data.createUser}`] = true;
        updates[`/UserRoles/${data.createUser}/householders/${data.householderId}/RESIDENT_ADMIN`] = true;
        updates[`/HouseholderPermissions/${data.householderId}/${data.createUser}`] = data.permission;
        return admin.database().ref().update(updates).then(() => {
          return data;
        })
      })
      .then(data => {
        ref.child(req.params.householderReqId).remove().then(() => {
          res.json({
            success:true, 
            message: {householderId:data.householderId}
          });
        })
      })
      .catch(error => http.internalServerError(req, res, error));
    }
  } catch(e) {
    console.log(`[POST /requisitions/householder/:householderReqId/verify ] ${e}`);
  }
  
  if (!process)
    http.permissionDenied(req, res);
})
.all((req, res) => http.methodNotAllowed(req, res));


module.exports = router;