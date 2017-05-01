const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const uuid = require("../libs/uuid");
const admin = require('firebase-admin');
const permission = require("../libs/permission");

const ref = admin.database().ref('HouseholderRequisitions');


// ===================== /householder =====================

router.route('/householder')
/**
 * @api {post} /requisitions/householder Create a new householder requisition
 * @apiName PostHouseholderRequisitions
 * @apiGroup HouseholderRequisitions
 *
 * @apiParam {String} communitySN 社區 serial number
 * @apiParam {Number} number      新住戶門牌號碼
 * @apiParam {String} floor       新住戶樓層
 * @apiParamExample {json} Request-Example:
 *  {
 *    "communitySN": "123456",
 *    "number": 66,
 *    "floor": "12"
 *  }
 *
 * @apiSuccess {Boolean}  success                 API 執行成功與否
 * @apiSuccess {Object}   message                 執行結果
 * @apiSuccess {String}   message.householderReqId  住戶申請單 ID
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *    "message": {
 *      "householderReqId": "Tmp7UHrj5LN0lAA0"
 *    }
 *  }
 * 
 * @apiUse Header
 * @apiUse Error
 */
.post((req, res) => {
  if (!req.body.communityId || !req.body.number || !req.body.floor)
    return http.badRequest(req, res);
  
  const communityId = req.body.communityId;
  const number = req.body.number;
  const floor = req.body.floor;
  
  // 新增住戶申請單
  if (permission.isAllowed(req.user.permission, 'HouseholderRequisitions:create')) {
    admin.database().ref(`Communities/${communityId}`).once('value').then(snapshot => {
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
        .catch(error => {return http.internalServerError(req, res, error)});
      }
      else 
        return http.badRequest(req, res);
      
    })
    .catch(error => {return http.internalServerError(req, res, error)});
  }
  else
    return http.permissionDenied(req, res);
})
/**
 * @api {get} /requisitions/householder Read data of householder requisitions
 * @apiName GetHouseholderRequisitions
 * @apiGroup HouseholderRequisitions
 *
 * @apiParam (Query string) {Boolean} [all] if true, 取得所有住戶申請單. if false, 取得使用者的住戶申請單.
 *
 * @apiSuccess {Boolean}  success                             API 執行成功與否
 * @apiSuccess {Object}   message                             執行結果
 * @apiSuccess {String}   message.householderReqId            住戶申請單 ID
 * @apiSuccess {String}   message.householderReqId.community  社區 ID
 * @apiSuccess {String}   message.householderReqId.createUser 住戶申請單建立人
 * @apiSuccess {String}   message.householderReqId.floor      新住戶樓層
 * @apiSuccess {String}   message.householderReqId.number     新住戶門牌號碼
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *    "message": {
 *      "7R2WlYFIYcLOgiLY": {
 *        "community": "WtICybIMORvkOg4I",
 *        "createUser": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
 *        "floor": "12",
 *        "number": 66
 *      }
 *    }
 *  }
 *
 * @apiUse Header
 * @apiUse Error
 */
.get((req, res) => {
  if (req.query.all === 'true') {
    // 取得所有住戶申請單
    if (permission.isAllowed(req.user.permission, 'HouseholderRequisitions:other:read')) {
      ref.once('value').then((snapshot) => {
        var result = {success:true, message:{}};
        snapshot.forEach((childSnapshot) => {
          result['message'][childSnapshot.key] = childSnapshot.val()
        })
        res.json(result);
      })
      .catch(error => {return http.internalServerError(req, res, error)});
    }
    else
      return http.permissionDenied(req, res);
  }
  else {
    // 取得使用者的住戶申請單
    if (permission.isAllowed(req.user.permission, 'HouseholderRequisitions:own:read')) {
      ref.orderByChild('createUser').equalTo(req.user.uid).once('value').then(snapshot => {
        var result = {success:true, message:{}};
        snapshot.forEach((childSnapshot) => {
          result['message'][childSnapshot.key] = childSnapshot.val();
        })
        res.json(result);
      })
      .catch(error => {return http.internalServerError(req, res, error)}); 
    }
    else
      return http.permissionDenied(req, res);
  }
})
.all((req, res) => {return http.methodNotAllowed(req, res)});


// ===================== /householder/:householderReqId =====================


router.route('/householder/:householderReqId')
.all((req, res, next) => {
  
  ref.child(req.params.householderReqId).once('value').then(snapshot => {
    if (snapshot.val())
      next();
    else
      return http.notFound(req, res);
  })
  .catch(error => {return http.internalServerError(req, res, error)});
  
})
/**
 * @api {get} /requisitions/householder/:householderReqId Read data of the householder requisition
 * @apiName GetHouseholderRequisition
 * @apiGroup HouseholderRequisitions
 *
 * @apiParam {String} householderReqId 住戶申請單 ID
 * 
 * @apiSuccess {Boolean}  success                             API 執行成功與否
 * @apiSuccess {Object}   message                             執行結果
 * @apiSuccess {String}   message.householderReqId            住戶申請單 ID
 * @apiSuccess {String}   message.householderReqId.community  社區 ID
 * @apiSuccess {String}   message.householderReqId.createUser 住戶申請單建立人
 * @apiSuccess {String}   message.householderReqId.floor      新住戶樓層
 * @apiSuccess {String}   message.householderReqId.number     新住戶門牌號碼
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *    "message": {
 *      "7R2WlYFIYcLOgiLY": {
 *        "community": "WtICybIMORvkOg4I",
 *        "createUser": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
 *        "floor": "12",
 *        "number": 66
 *      }
 *    }
 *  }
 *
 * @apiUse Header
 * @apiUse Error
 */
.get((req, res) => {
  const householderReqId = req.params.householderReqId;
  
  // 取得指定住戶申請單資料 (可以讀其他人的) 
  if (permission.isAllowed(req.user.permission, 'HouseholderRequisitions:other:read')) {
    ref.child(householderReqId).once('value').then(snapshot => {
      var result = {success:true, message:{}};
      result.message[snapshot.key] = snapshot.val();
      res.json(result);
    }).catch(error => {return http.internalServerError(req, res, error)}); 
  }
  // 取得指定住戶申請單資料 (只能讀自己的)
  else if (permission.isAllowed(req.user.permission, 'HouseholderRequisitions:own:read')) {
    ref.child(householderReqId).once('value').then(snapshot => {
      if (snapshot.val().createUser === req.user.uid) {
        var result = {success:true, message:{}};
        result.message[snapshot.key] = snapshot.val();
        res.json(result);
      }
      else
        return http.permissionDenied(req, res);
    })
    .catch(error => {return http.internalServerError(req, res, error)});
  }
  else
    return http.permissionDenied(req, res);
})
/**
 * @api {delete} /requisitions/householder/:householderReqId Delete the householder requisition
 * @apiName DeleteHouseholderRequisition
 * @apiGroup HouseholderRequisitions
 *
 * @apiParam {String} householderReqId 住戶申請單 ID
 * 
 * @apiSuccess {Boolean}  success                             API 執行成功與否
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "success": true
 *  }
 *
 * @apiUse Header
 * @apiUse Error
 */
.delete((req, res) => {
  const householderReqId = req.params.householderReqId;
  
  // 刪除指定住戶申請單 (可以刪除其它人的)
  if (permission.isAllowed(req.user.permission, 'HouseholderRequisitions:other:delete')) {
    ref.child(householderReqId).remove().then(() => {
      res.json({success:true});
    })
    .catch(error => {return http.internalServerError(req, res, error)});
  }
  // 刪除指定住戶申請單 (只能刪除自己的)
  else if (permission.isAllowed(req.user.permission, 'HouseholderRequisitions:own:delete')) {
    ref.child(householderReqId).once('value').then(snapshot => {
      if (snapshot.val().createUser === req.user.uid) {
        ref.child(householderReqId).remove().then(() => {
          res.json({success:true});
        })
        .catch(error => {return http.internalServerError(req, res, error)});
      } else {
        return http.permissionDenied(req, res);
      }
    })
    .catch(error => {return http.internalServerError(req, res, error)});
  }
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});


// ===================== /householder/:householderReqId/verify =====================

router.route('/householder/:householderReqId/verify')
.all((req, res, next) => {
  ref.child(req.params.householderReqId).once('value').then(snapshot => {
    if (snapshot.val())
      next();
    else
      return http.notFound(req, res);
  })
  .catch(error => {return http.internalServerError(req, res, error)});
})
/**
 * @api {post} /requisitions/householder/:householderReqId/verify Verify the householder requisition
 * @apiName PostHouseholderRequisitionVerify
 * @apiGroup HouseholderRequisitions
 *
 * @apiParam {String} householderReqId 住戶申請單 ID
 * 
 * @apiSuccess {Boolean}  success             API 執行成功與否
 * @apiSuccess {Object}   message             執行結果
 * @apiSuccess {String}   message.householderId 住戶 ID
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *    "message": {
 *      "householderId": "WtICybIMORvkOg4I"
 *    }
 *  }
 *
 * @apiUse Header
 * @apiUse Error
 */
.post((req, res) => {
  // 指定住戶申請單審核通過
  if (permission.isAllowed(req.user.permission, 'HouseholderRequisitions:verify')) {
    ref.child(req.params.householderReqId).once('value').then(snapshot => {
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
    .catch(error => {return http.internalServerError(req, res, error)});
  }
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});


module.exports = router;