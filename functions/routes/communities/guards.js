const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const admin = require('firebase-admin');
const verify = require("../libs/verify")

const randomstring = require("../libs/randomstring");
const permission = require("../libs/permission");
const merge = require("deepmerge");


/*
  URL : /communities/:communityId/guards/inviteCode/
*/
router.route('/:communityId/guards/inviteCode')
.all((req, res, next) => {
  verify.communityExist(req, res, next);
})
.all((req, res, next) => {
  permission.community(req, res, next);
})
/**
 * @api {get} /communities/:communityId/guards/inviteCode Read user GUARD invite code in the community
 * @apiName GetCommunityGuardInviteCode
 * @apiGroup CommunityGuards
 *
 * @apiParam {String} communityId 社區 ID 
 * 
 * @apiSuccess {Boolean}  success             API 執行成功與否
 * @apiSuccess {Object}   message             執行結果
 * @apiSuccess {String}   message.code        invite code (6 位數字+大小寫字母隨機產生)
 * @apiSuccess {String}   message.createTime  invite code 建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.expiredTime invite code 過期時間, 建立時間 10 分鐘後 (time since the Unix epoch, in milliseconds)
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "code": "ZShsyl",
    "createTime": 1493696307392,
    "expiredTime": 1493696907392
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */
.get((req, res) => {
  if (permission.isAllowed(req.user.permission, 'MemberInviteCodes:GUARD:own:read')) {
    admin.database().ref(`GuardInviteCodes/${req.communityId}/${req.user.uid}`).once('value')
    .then(snapshot => {
      var result = {success:true, message:{}};
      if (snapshot.val())
        result.message = snapshot.val();
      return res.json(result);
    }).catch(error => {return http.internalServerError(req, res, error)});   
  }
  else
    return http.permissionDenied(req, res);
})
/**
 * @api {post} /communities/:communityId/guards/inviteCode Create new user GUARD invite code in the community
 * @apiName PostCommunityGuardInviteCode
 * @apiGroup CommunityGuards
 *
 * @apiParam {String} communityId 社區 ID 
 * 
 * @apiSuccess {Boolean}  success             API 執行成功與否
 * @apiSuccess {Object}   message             執行結果
 * @apiSuccess {String}   message.code        invite code (6 位數字+大小寫字母隨機產生)
 * @apiSuccess {String}   message.createTime  invite code 建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.expiredTime invite code 過期時間, 建立時間 10 分鐘後 (time since the Unix epoch, in milliseconds)
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "code": "ZShsyl",
    "createTime": 1493696307392,
    "expiredTime": 1493696907392
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */
.post((req, res) => {
  if (permission.isAllowed(req.user.permission, 'MemberInviteCodes:GUARD:create')) {
    const createTime = new Date();
    const createTimestamp = createTime.getTime();
    const expiredTimestamp = createTime.setMinutes(createTime.getMinutes() + 10);
    const code = randomstring.code();
    admin.database().ref(`GuardInviteCodes/${req.communityId}/${req.user.uid}`).set({
      code: code,
      createTime: createTimestamp,
      expiredTime: expiredTimestamp
    }).then(() => {
      const inviteCodeId = `GUARD_${req.user.uid}${req.communityId}`;
      return admin.database().ref(`InviteCodes/${inviteCodeId}`).set({
        role: 'GUARD',
        community: req.communityId,
        code: code,
        createTime: createTimestamp,
        expiredTime: expiredTimestamp
      })
    }).then(() => {
      admin.database().ref(`GuardInviteCodes/${req.communityId}/${req.user.uid}`).once('value')
      .then(snapshot => {
        return res.json({success:true, message:snapshot.val()});
      }).catch(error => {return http.internalServerError(req, res, error)});
    }).catch(error => {return http.internalServerError(req, res, error)});
  }
  else
    return http.permissionDenied(req, res);
})
/**
 * @api {put} /communities/:communityId/guards/inviteCode Update user GUARD invite code in the community
 * @apiName PutCommunityGuardInviteCode
 * @apiGroup CommunityGuards
 *
 * @apiParam {String} communityId 社區 ID 
 * 
 * @apiSuccess {Boolean}  success             API 執行成功與否
 * @apiSuccess {Object}   message             執行結果
 * @apiSuccess {String}   message.code        invite code (6 位數字+大小寫字母隨機產生)
 * @apiSuccess {String}   message.createTime  invite code 建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.expiredTime invite code 過期時間, 建立時間 10 分鐘後 (time since the Unix epoch, in milliseconds)
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "code": "ZShsyl",
    "createTime": 1493696307392,
    "expiredTime": 1493696907392
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */
.put((req, res) => {
  if (permission.isAllowed(req.user.permission, 'MemberInviteCodes:GUARD:own:update')) {
    const createTime = new Date();
    const createTimestamp = createTime.getTime();
    const expiredTimestamp = createTime.setMinutes(createTime.getMinutes() + 10);
    const code = randomstring.code()
    admin.database().ref(`GuardInviteCodes/${req.communityId}/${req.user.uid}`).set({
      code: code,
      createTime: createTimestamp,
      expiredTime: expiredTimestamp
    }).then(() => {
      const inviteCodeId = `GUARD_${req.user.uid}${req.communityId}`;
      return admin.database().ref(`InviteCodes/${inviteCodeId}`).set({
        role: 'GUARD',
        community: req.communityId,
        code: code,
        createTime: createTimestamp,
        expiredTime: expiredTimestamp
      })
    }).then(() => {
      admin.database().ref(`GuardInviteCodes/${req.communityId}/${req.user.uid}`).once('value')
      .then(snapshot => {
        return res.json({success:true, message:snapshot.val()});
      }).catch(error => {return http.internalServerError(req, res, error)});
    }).catch(error => {return http.internalServerError(req, res, error)});
  }
  else
    return http.permissionDenied(req, res);
})
/**
 * @api {delete} /communities/:communityId/guards/inviteCode Delete user GUARD invite code in the community
 * @apiName DeleteCommunityGuardInviteCode
 * @apiGroup CommunityGuards
 *
 * @apiParam {String} communityId 社區 ID 
 * 
 * @apiSuccess {Boolean}  success             API 執行成功與否
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true
}
 *
 * @apiUse Header
 * @apiUse Error
 */
.delete((req, res) => {
  if (permission.isAllowed(req.user.permission, 'MemberInviteCodes:GUARD:own:delete')) {
    admin.database().ref(`GuardInviteCodes/${req.communityId}/${req.user.uid}`).remove()
    .then(() => {
      const inviteCodeId = `GUARD_${req.user.uid}${req.communityId}`;
      return admin.database().ref(`InviteCodes/${inviteCodeId}`).remove();
    })
    .then(() => {
      return res.json({success:true})
    }).catch(error => {return http.internalServerError(req, res, error)});
  }
  else
    http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});


/*
  URL : /communities/:communityId/guards/invitations/
*/

router.route('/:communityId/guards/invitations')
.all((req, res, next) => {
  verify.communityExist(req, res, next);
})
.all((req, res, next) => {
  permission.community(req, res, next);
})
/**
 * @api {get} /communities/:communityId/guards/invitations Read data of GUARD invitations in the community
 * @apiName GetGuardInvitations
 * @apiGroup CommunityGuards
 *
 * @apiParam {String} communityId 社區 ID 
 * 
 * @apiParam (Query string) {Boolean} [all] if true, 取得所有物業保全邀請單. if false, 取得使用者的物業保全邀請單.
 *
 * @apiSuccess {Boolean}  success                             API 執行成功與否
 * @apiSuccess {Object}   message                             執行結果
 * @apiSuccess {String}   message.invitationId                邀請單 ID
 * @apiSuccess {String}   message.invitationId.beInvitedUser  被邀請人資料
 * @apiSuccess {String}   message.invitationId.beInvitedUser.userId       被邀請人 ID
 * @apiSuccess {String}   message.invitationId.beInvitedUser.userId.email 被邀請人 email
 * @apiSuccess {String}   message.invitationId.beInvitedUser.userId.name  被邀請人名稱
 * @apiSuccess {String}   message.invitationId.beInvitedUser.userId.photo 被邀請人大頭貼 URL
 * @apiSuccess {String}   message.invitationId.inviteUser     邀請人資料
 * @apiSuccess {String}   message.invitationId.inviteUser.userId       邀請人 ID
 * @apiSuccess {String}   message.invitationId.inviteUser.userId.email 邀請人 email
 * @apiSuccess {String}   message.invitationId.inviteUser.userId.name  邀請人名稱
 * @apiSuccess {String}   message.invitationId.inviteUser.userId.photo 邀請人大頭貼 URL
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "JO9sfu9m8Yh4IXEQ": {
      "beInvitedUser": {
        "2KK70qWWUpOFuY9R9xDneMyPjVY2": {
          "email": "faye@gmail.com",
          "isPublic": true,
          "name": "faye",
          "photo": ""
        }
      },
      "inviteUser": {
        "HOeBzcVmwyPTL3Kdl6abfQwIbx82": {
          "email": "root@cpig.com",
          "isPublic": true,
          "name": "system_admin",
          "photo": ""
        }
      }
    }
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */
.get((req, res) => {
  if (req.query.all === true) {
    if (permission.isAllowed(req.user.permission, 'InviteMembers:GUARD:other:read')) {
      admin.database().ref(`InvitedGuards/${req.communityId}`).once('value')
      .then(snapshot => {
        var result = {success:true, message:{}};
        var process = [];
        snapshot.forEach(childSnapshot => {
          const invitationId = childSnapshot.key;
          const beInvitedUser = childSnapshot.val().beInvitedUser;
          const inviteUser = childSnapshot.val().inviteUser;
          process.push(
            admin.database().ref(`Users/${beInvitedUser}`).once('value').then(snapshot => {
              var data = {};
              data[invitationId] = { beInvitedUser:{} };
              data[invitationId]['beInvitedUser'][beInvitedUser] = snapshot.val();
              return data;
            })
          );
          process.push(
            admin.database().ref(`Users/${inviteUser}`).once('value').then(snapshot => {
              var data = {};
              data[invitationId] = { inviteUser:{} };
              data[invitationId]['inviteUser'][inviteUser] = snapshot.val();
              return data;
            })
          )
        })
        
        if (process.length > 0) {
          Promise.all(process).then(data => {
            result.message = merge.all(data);
            return res.json(result);
          }).catch(error => {return http.internalServerError(req, res, error)});
        }
        else
          return res.json({success:true, message:{}})
        
      }).catch(error => {return http.internalServerError(req, res, error)});
    }
    else
      return http.permissionDenied(req, res);
  }
  else {
    if (permission.isAllowed(req.user.permission, 'InviteMembers:GUARD:own:read')) {
      admin.database().ref(`InvitedGuards/${req.communityId}`).orderByChild('inviteUser').equalTo(req.user.uid).once('value')
      .then(snapshot => {
        var result = {success:true, message:{}};
        var process = [];
        snapshot.forEach(childSnapshot => {
          const invitationId = childSnapshot.key;
          const beInvitedUser = childSnapshot.val().beInvitedUser;
          const inviteUser = childSnapshot.val().inviteUser;
          process.push(
            admin.database().ref(`Users/${beInvitedUser}`).once('value').then(snapshot => {
              var data = {};
              data[invitationId] = { beInvitedUser:{} };
              data[invitationId]['beInvitedUser'][beInvitedUser] = snapshot.val();
              return data;
            })
          );
          process.push(
            admin.database().ref(`Users/${inviteUser}`).once('value').then(snapshot => {
              var data = {};
              data[invitationId] = { inviteUser:{} };
              data[invitationId]['inviteUser'][inviteUser] = snapshot.val();
              return data;
            })
          )
        })
        
        if (process.length > 0) {
          Promise.all(process).then(data => {
            result.message = merge.all(data);
            return res.json(result);
          }).catch(error => {return http.internalServerError(req, res, error)});
        }
        else
          return res.json({success:true, message:{}})
      }).catch(error => {return http.internalServerError(req, res, error)});
    }
    else
      return http.permissionDenied(req, res);
  }
})
/**
 * @api {post} /communities/:communityId/guards/invitations Invite GUARD in the community
 * @apiName PostGuardInvitations
 * @apiGroup CommunityGuards
 *
 * @apiParam {String} communityId 社區 ID 
 * @apiParam {String} user 被邀請人 ID
 * 
 * @apiParamExample {json} Request-Example:
{
  "user": "6guc1Vmi9KfMJ5SgHkMs7sm6hE32"
}
 *
 * @apiSuccess {Boolean}  success                             API 執行成功與否
 * @apiSuccess {Object}   message                             執行結果
 * @apiSuccess {String}   message.invitationId                邀請單 ID
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "invitationId": "7DfPcmMf8bBa3ZY2"
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */
.post((req, res) => { 
  if (!req.body.user)
    return http.badRequest(req, res, 'parameter "user" is required')
    
  if (permission.isAllowed(req.user.permission, 'InviteMembers:GUARD:create')) {
    admin.database().ref(`Users/${req.body.user}`).once('value').then(snapshot => {
      return snapshot.val(); 
    }).then(user => {
      if (!user)
        return http.badRequest(req, res, `user "${req.body.user}" does not exist`)
      else {
        admin.database().ref(`CommunityMembers/${req.communityId}/GUARD/${req.body.user}`).once('value')
        .then(snapshot => {
          if (!snapshot.val()) {
            const invitationId = randomstring.uuid();
            admin.database().ref(`InvitedGuards/${req.communityId}/${invitationId}`).set({
              beInvitedUser: req.body.user,
              inviteUser: req.user.uid
            }).then(() => {
              admin.database().ref(`Invitations/${invitationId}`).set({
                role: 'GUARD',
                community: req.communityId,
                inviteUser: req.user.uid,
                beInvitedUser: req.body.user
              }).then(() => {
                return res.json({
                  success: true,
                  message: {invitationId:invitationId}
                });
              })
            }).catch(error => {return http.internalServerError(req, res, error)});
          }
          else
            return http.badRequest(req, res, `user "${req.body.user}" is already the guard of this community`)
        }).catch(error => {return http.internalServerError(req, res, error)});
      }
    }).catch(error => {return http.internalServerError(req, res, error)});
  }
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

/*
  URL : /communities/:communityId/guards/invitations/:invitationId/
*/
router.route('/:communityId/guards/invitations/:invitationId')
.all((req, res, next) => {
  verify.communityExist(req, res, next);
})
.all((req, res, next) => {
  permission.community(req, res, next);
})
.all((req, res, next) => {
  admin.database().ref(`InvitedGuards/${req.communityId}`).orderByKey().equalTo(req.params.invitationId).once('value')
  .then(snapshot => {
    if (snapshot.val())
      next();
    else
      return http.badRequest(req, res, `invitation "${req.params.invitationId}" does not exist`);
  }).catch(error => {return http.internalServerError(req, res, error)});
})
/**
 * @api {get} /communities/:communityId/guards/invitations/:invitationId Read data of the GUARD invitation in the community
 * @apiName GetGuardInvitation
 * @apiGroup CommunityGuards
 *
 * @apiParam {String} communityId 社區 ID 
 * @apiParam {String} invitationId 邀請單 ID 
 * 
 * @apiSuccess {Boolean}  success                             API 執行成功與否
 * @apiSuccess {Object}   message                             執行結果
 * @apiSuccess {String}   message.invitationId                邀請單 ID
 * @apiSuccess {String}   message.invitationId.beInvitedUser  被邀請人資料
 * @apiSuccess {String}   message.invitationId.beInvitedUser.userId       被邀請人 ID
 * @apiSuccess {String}   message.invitationId.beInvitedUser.userId.email 被邀請人 email
 * @apiSuccess {String}   message.invitationId.beInvitedUser.userId.name  被邀請人名稱
 * @apiSuccess {String}   message.invitationId.beInvitedUser.userId.photo 被邀請人大頭貼 URL
 * @apiSuccess {String}   message.invitationId.inviteUser     邀請人資料
 * @apiSuccess {String}   message.invitationId.inviteUser.userId       邀請人 ID
 * @apiSuccess {String}   message.invitationId.inviteUser.userId.email 邀請人 email
 * @apiSuccess {String}   message.invitationId.inviteUser.userId.name  邀請人名稱
 * @apiSuccess {String}   message.invitationId.inviteUser.userId.photo 邀請人大頭貼 URL
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "JO9sfu9m8Yh4IXEQ": {
      "beInvitedUser": {
        "2KK70qWWUpOFuY9R9xDneMyPjVY2": {
          "email": "faye@gmail.com",
          "isPublic": true,
          "name": "faye",
          "photo": ""
        }
      },
      "inviteUser": {
        "HOeBzcVmwyPTL3Kdl6abfQwIbx82": {
          "email": "root@cpig.com",
          "isPublic": true,
          "name": "system_admin",
          "photo": ""
        }
      }
    }
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */
.get((req, res) => {
  if (permission.isAllowed(req.user.permission, 'InviteMembers:GUARD:other:read')) {
    admin.database().ref(`InvitedGuards/${req.communityId}/${req.params.invitationId}`).once('value')
    .then(snapshot => {
      var result = {success:true, message:{}};
      var process = [];
      const invitationId = req.params.invitationId;
      const beInvitedUser = snapshot.val().beInvitedUser;
      const inviteUser = snapshot.val().inviteUser;
      process.push(
        admin.database().ref(`Users/${beInvitedUser}`).once('value').then(snapshot => {
          var data = {};
          data[invitationId] = { beInvitedUser:{} };
          data[invitationId]['beInvitedUser'][beInvitedUser] = snapshot.val();
          return data;
        })
      );
      process.push(
        admin.database().ref(`Users/${inviteUser}`).once('value').then(snapshot => {
          var data = {};
          data[invitationId] = { inviteUser:{} };
          data[invitationId]['inviteUser'][inviteUser] = snapshot.val();
          return data;
        })
      )
      
      Promise.all(process).then(data => {
        result.message = merge.all(data);
        return res.json(result);
      }).catch(error => {return http.internalServerError(req, res, error)});
      
    }).catch(error => {return http.internalServerError(req, res, error)});
  }
  else if (permission.isAllowed(req.user.permission, 'InviteMembers:GUARD:own:read')) {
    admin.database().ref(`InvitedGuards/${req.communityId}/${req.params.invitationId}`).once('value')
    .then(snapshot => {
      const invitationId = req.params.invitationId;
      const beInvitedUser = snapshot.val().beInvitedUser;
      const inviteUser = snapshot.val().inviteUser;
      if (inviteUser === req.user.uid) {
        var result = {success:true, message:{}};
        var process = [];
        process.push(
          admin.database().ref(`Users/${beInvitedUser}`).once('value').then(snapshot => {
            var data = {};
            data[invitationId] = { beInvitedUser:{} };
            data[invitationId]['beInvitedUser'][beInvitedUser] = snapshot.val();
            return data;
          })
        );
        process.push(
          admin.database().ref(`Users/${inviteUser}`).once('value').then(snapshot => {
            var data = {};
            data[invitationId] = { inviteUser:{} };
            data[invitationId]['inviteUser'][inviteUser] = snapshot.val();
            return data;
          })
        )
        Promise.all(process).then(data => {
          result.message = merge.all(data);
          return res.json(result);
        }).catch(error => {return http.internalServerError(req, res, error)});
      }
      else
        return http.permissionDenied(req, res);
    }).catch(error => {return http.internalServerError(req, res, error)});
  }
  else
    return http.permissionDenied(req, res);
})
/**
 * @api {delete} /communities/:communityId/guards/invitations/:invitationId Cancel the GUARD invitation in the community
 * @apiName DeleteGuardInvitation
 * @apiGroup CommunityGuards
 *
 * @apiParam {String} communityId 社區 ID 
 * @apiParam {String} invitationId 邀請單 ID 
 * 
 * @apiSuccess {Boolean}  success                             API 執行成功與否
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true
}
 *
 * @apiUse Header
 * @apiUse Error
 */
.delete((req, res) => {
  if (permission.isAllowed(req.user.permission, 'InviteMembers:GUARD:other:delete')) {
    admin.database().ref(`InvitedGuards/${req.communityId}/${req.params.invitationId}`).remove()
    .then(() => {
      return res.json({success:true});
    }).catch(error => {return http.internalServerError(req, res, error)});
  }
  else if (permission.isAllowed(req.user.permission, 'InviteMembers:GUARD:own:delete')) {
    admin.database().ref(`InvitedGuards/${req.communityId}/${req.params.invitationId}`).once('value').then(snapshot => {
      if (snapshot.val().inviteUser === req.user.uid) {
        admin.database().ref(`InvitedGuards/${req.communityId}/${req.params.invitationId}`).remove()
        .then(() => {
          return res.json({success:true});
        }).catch(error => {return http.internalServerError(req, res, error)});
      }
      else
        return http.permissionDenied(req, res);
    }).catch(error => {return http.internalServerError(req, res, error)});
  }
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});


/*
  URL : /communities/:communityId/guards/?all=true/false
*/
router.route('/:communityId/guards')
.all((req, res, next) => {
  verify.communityExist(req, res, next);
})
.all((req, res, next) => {
  permission.community(req, res, next);
})
/**
 * @api {get} /communities/:communityId/guards Read data of GUARDs in the community
 * @apiName GetGuards
 * @apiGroup CommunityGuards
 *
 * @apiParam {String} communityId 社區 ID 
 * 
 * @apiParam (Query string) {Boolean} [all] if true, 取得所有物業保全資料. if false, 取得自己的物業保全資料.
 *
 * @apiSuccess {Boolean}  success              API 執行成功與否
 * @apiSuccess {Object}   message              執行結果
 * @apiSuccess {String}   message.userId       物業保全 ID
 * @apiSuccess {String}   message.userId.email 物業保全 email
 * @apiSuccess {String}   message.userId.name  物業保全名稱
 * @apiSuccess {String}   message.userId.photo 物業保全大頭貼 URL
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "HOeBzcVmwyPTL3Kdl6abfQwIbx82": {
      "email": "root@cpig.com",
      "isPublic": true,
      "name": "system_admin",
      "photo": ""
    }
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */
.get((req, res) => { 
  if (req.query.all === 'true') {
    if (permission.isAllowed(req.user.permission, 'Members:GUARD:other:read')) {
      admin.database().ref(`CommunityMembers/${req.communityId}/GUARD`).once('value')
      .then(snapshot => {
        var process = [];
        snapshot.forEach((childSnapshot) => {
          const userId = childSnapshot.key;
          process.push(
            admin.database().ref(`Users/${userId}`).once('value').then(snapshot => {
              var result = {};
              result[userId] = snapshot.val();
              return result;
            }).catch(error => {return http.internalServerError(req, res, error)})
          );
        })
        
        var result = {success:true, message:{}};
        if (process.length > 0) {
          Promise.all(process).then(data => {
            if (process.length === 1)
              result.message = data[0]
            else
              result.message = merge.all(data)
            return res.json(result);
          }).catch(error => {return http.internalServerError(req, res, error)});
        }
        else
          return res.json(result);
      })
      .catch(error => {return http.internalServerError(req, res, error)});
    }
    else
      return http.permissionDenied(req, res);
  }
  else {
    if (permission.isAllowed(req.user.permission, 'Members:GUARD:own:read')) {
      admin.database().ref(`CommunityMembers/${req.communityId}/GUARD`).orderByKey().equalTo(req.user.uid).once('value')
      .then(snapshot => {
        var result = {success:true, message:{}};
        if (snapshot.val()) {
          admin.database().ref(`Users/${req.user.uid}`).once('value').then(snapshot => {
            result.message[req.user.uid] = snapshot.val();
            return res.json(result);
          }).catch(error => {return http.internalServerError(req, res, error)})
        }
        else
          return res.json(result);
      })
      .catch(error => {return http.internalServerError(req, res, error)});
    }
    else
      return http.permissionDenied(req, res);
  }
})
.all((req, res) => {return http.methodNotAllowed(req, res)});



/*
  URL : /communities/:communityId/guards/:userId/
*/
router.route('/:communityId/guards/:userId')
.all((req, res, next) => {
  verify.communityExist(req, res, next);
})
.all((req, res, next) => {
  permission.community(req, res, next);
})
.all((req, res, next) => {
  admin.database().ref(`CommunityMembers/${req.params.communityId}/GUARD/${req.params.userId}`).once('value')
  .then(snapshot => {
    if (snapshot.val())
      next();
    else
      http.badRequest(req, res, `community guard "${req.params.userId}" does not exist`);
  }).catch(error => {return http.internalServerError(req, res, error)});
})
/**
 * @api {get} /communities/:communityId/guards/:userId Read data of the GUARD in the community
 * @apiName GetGuard
 * @apiGroup CommunityGuards
 *
 * @apiParam {String} communityId 社區 ID 
 * @apiParam {String} userId 物業保全 ID 
 *
 * @apiSuccess {Boolean}  success              API 執行成功與否
 * @apiSuccess {Object}   message              執行結果
 * @apiSuccess {String}   message.userId       物業保全 ID
 * @apiSuccess {String}   message.userId.email 物業保全 email
 * @apiSuccess {String}   message.userId.name  物業保全名稱
 * @apiSuccess {String}   message.userId.photo 物業保全大頭貼 URL
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "HOeBzcVmwyPTL3Kdl6abfQwIbx82": {
      "email": "root@cpig.com",
      "isPublic": true,
      "name": "system_admin",
      "photo": ""
    }
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */
.get((req, res) => { 
  if (permission.isAllowed(req.user.permission, 'Members:GUARD:other:read')) {
    admin.database().ref(`Users/${req.params.userId}`).once('value').then(snapshot => {
      var result = {success:true, message:{}}
      result.message[req.params.userId] = snapshot.val();
      return res.json(result);
    }).catch(error => {return http.internalServerError(req, res, error)});
  }
  else if (permission.isAllowed(req.user.permission, 'Members:GUARD:own:read')) {
    if (req.params.userId === req.user.id) {
      admin.database().ref(`Users/${req.params.userId}`).once('value').then(snapshot => {
        var result = {success:true, message:{}}
        result.message[req.params.userId] = snapshot.val();
        return res.json(result);
      }).catch(error => {return http.internalServerError(req, res, error)});
    }
    else
      return http.permissionDenied(req, res);
  }
  else
    return http.permissionDenied(req, res);
})
/**
 * @api {delete} /communities/:communityId/guards/:userId Delete/Leave the GUARD in the community
 * @apiName DeleteGuard
 * @apiGroup CommunityGuards
 *
 * @apiParam {String} communityId 社區 ID 
 * @apiParam {String} userId 物業保全 ID 
 *
 * @apiSuccess {Boolean}  success              API 執行成功與否
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true
}
 *
 * @apiUse Header
 * @apiUse Error
 */
.delete((req, res) => { 
  if (permission.isAllowed(req.user.permission, 'Members:GUARD:other:delete')) {
    admin.database().ref(`CommunityMembers/${req.communityId}/GUARD/${req.params.userId}`).remove()
    .then(() => {
      return admin.database().ref(`GuardInviteCodes/${req.params.userId}`).remove();
    })
    .then(() => {
      return admin.database().ref(`UserRoles/${req.params.userId}/communities/${req.communityId}/GUARD`).remove();
    })
    .then(() => {
      return res.json({success:true});
    })
    .catch(error => {return http.internalServerError(req, res, error)});
  }
  else if (permission.isAllowed(req.user.permission, 'Members:GUARD:own:delete')) {
    if (req.params.userId === req.user.uid) {
      admin.database().ref(`CommunityMembers/${req.communityId}/GUARD/${req.params.userId}`).remove()
      .then(() => {
        return admin.database().ref(`GuardInviteCodes/${req.params.userId}`).remove();
      })
      .then(() => {
        return admin.database().ref(`UserRoles/${req.params.userId}/communities/${req.communityId}/GUARD`).remove();
      })
      .then(() => {
        res.json({success:true});
      })
      .catch(error => {return http.internalServerError(req, res, error)});
    }
    else
      return http.permissionDenied(req, res);
  }
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});


module.exports = router;