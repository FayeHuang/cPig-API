const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const admin = require('firebase-admin');
const permission = require("../libs/permission");
const merge = require("deepmerge");

router.route('/')
/**
 * @api {get} /invitations Read data of invitations
 * @apiName GetInvitations
 * @apiGroup UserInvitations
 * 
 * @apiParam (Query string) {Boolean} [all] if true, 取得所有邀請單資料. if false, 取得自己的邀請單資料.
 *
 * @apiSuccess {Boolean}  success                             API 執行成功與否
 * @apiSuccess {Object}   message                             執行結果
 * @apiSuccess {String}   message.invitationId                邀請單 ID
 * @apiSuccess {String}   message.invitationId.role           邀請加入的角色. ex:COMMUNITY_ADMIN
 * @apiSuccess {Object}   message.invitationId.inviteUser     邀請人資料
 * @apiSuccess {String}   message.invitationId.inviteUser.userId       邀請人 ID
 * @apiSuccess {String}   message.invitationId.inviteUser.userId.email 邀請人 email
 * @apiSuccess {String}   message.invitationId.inviteUser.userId.name  邀請人名稱
 * @apiSuccess {String}   message.invitationId.inviteUser.userId.photo 邀請人大頭貼 URL
 * @apiSuccess {Object}   message.invitationId.beInvitedUser     被邀請人資料
 * @apiSuccess {String}   message.invitationId.beInvitedUser.userId       被邀請人 ID
 * @apiSuccess {String}   message.invitationId.beInvitedUser.userId.email 被邀請人 email
 * @apiSuccess {String}   message.invitationId.beInvitedUser.userId.name  被邀請人名稱
 * @apiSuccess {String}   message.invitationId.beInvitedUser.userId.photo 被邀請人大頭貼 URL
 * @apiSuccess {Object}   message.invitationId.community               邀請加入的社區資料
 * @apiSuccess {String}   message.invitationId.community.communityId   社區 ID 
 * @apiSuccess {String}   message.invitationId.community.communityId.name 社區名稱
 * @apiSuccess {String}   message.invitationId.community.communityId.address 社區地址
 * @apiSuccess {Object}   [message.invitationId.householder]               邀請加入的住戶資料
 * @apiSuccess {String}   [message.invitationId.householder.householderId]   住戶 ID 
 * @apiSuccess {String}   [message.invitationId.householder.householderId.number] 住戶門牌號碼
 * @apiSuccess {String}   [message.invitationId.householder.householderId.floor]  住戶樓層
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "3iyCyxMP7RihqGsk": {
      "inviteUser": {
        "HOeBzcVmwyPTL3Kdl6abfQwIbx82": {
          "email": "root@cpig.com",
          "isPublic": true,
          "name": "system_admin",
          "photo": ""
        }
      },
      "role": "COMMUNITY_ADMIN",
      "beInvitedUser": {
        "6guc1Vmi9KfMJ5SgHkMs7sm6hE32": {
          "email": "user1@cpig.com",
          "isPublic": true,
          "name": "user1",
          "photo": ""
        }
      },
      "community": {
        "WtICybIMORvkOg4I": {
          "address": "address 2222",
          "name": "community 2"
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
  if (req.query.all === 'true') {
    if (permission.isAllowed(req.user.permission, 'Invitations:other:read')) {
      admin.database().ref(`Invitations`).once('value').then(snapshot => {
        var process = [];
        snapshot.forEach(childSnapshot => {
          const invitationId = childSnapshot.key;
          const role = childSnapshot.val().role;
          const inviteUser = childSnapshot.val().inviteUser;
          const beInvitedUser = childSnapshot.val().beInvitedUser;
        
          process.push(
            admin.database().ref(`Users/${inviteUser}`).once('value').then(snapshot => {
              var data = {};
              data[invitationId] = { inviteUser:{}, role:role };
              data[invitationId]['inviteUser'][inviteUser] = snapshot.val();
              return data;
            })
          )
          
          process.push(
            admin.database().ref(`Users/${beInvitedUser}`).once('value').then(snapshot => {
              var data = {};
              data[invitationId] = { beInvitedUser:{} };
              data[invitationId]['beInvitedUser'][beInvitedUser] = snapshot.val();
              return data;
            })
          )
        
          if (role === 'COMMUNITY_ADMIN' || role === 'GUARD') {
            const communityId = childSnapshot.val().community;
            process.push(
              admin.database().ref(`Communities/${communityId}`).once('value').then(snapshot => {
                var data = {}
                data[invitationId] = { community:{} };
                data[invitationId]['community'][communityId] = snapshot.val();
                return data;
              })
            )
          }
          else if (role === 'RESIDENT' || role === 'RESIDENT_ADMIN') {
            
          }
        })
      
        var result = {success:true, message:{}};
        if (process.length > 0) {
          Promise.all(process).then(data => {
            result.message = merge.all(data)
            return res.json(result);
          })
        }
        else
          return res.json(result);
      }).catch(error => {return http.internalServerError(req, res, error)});
    }
    else
      return http.permissionDenied(req, res);
  }
  else {
    if (permission.isAllowed(req.user.permission, 'Invitations:own:read')) {
      admin.database().ref(`Invitations`).orderByChild('beInvitedUser').equalTo(req.user.uid).once('value').then(snapshot => {
        var process = [];
        snapshot.forEach(childSnapshot => {
          const invitationId = childSnapshot.key;
          const role = childSnapshot.val().role;
          const inviteUser = childSnapshot.val().inviteUser;
          const beInvitedUser = childSnapshot.val().beInvitedUser;
          
          process.push(
            admin.database().ref(`Users/${inviteUser}`).once('value').then(snapshot => {
              var data = {};
              data[invitationId] = { inviteUser:{}, role:role };
              data[invitationId]['inviteUser'][inviteUser] = snapshot.val();
              return data;
            })
          )
        
          process.push(
            admin.database().ref(`Users/${beInvitedUser}`).once('value').then(snapshot => {
              var data = {};
              data[invitationId] = { beInvitedUser:{} };
              data[invitationId]['beInvitedUser'][beInvitedUser] = snapshot.val();
              return data;
            })
          )
        
          if (role === 'COMMUNITY_ADMIN' || role === 'GUARD') {
            const communityId = childSnapshot.val().community;
            process.push(
              admin.database().ref(`Communities/${communityId}`).once('value').then(snapshot => {
                var data = {}
                data[invitationId] = { community:{} };
                data[invitationId]['community'][communityId] = snapshot.val();
                return data;
              })
            )
          }
          else if (role === 'RESIDENT' || role === 'RESIDENT_ADMIN') {
            
          }
        })
      
        var result = {success:true, message:{}};
        if (process.length > 0) {
          Promise.all(process).then(data => {
            result.message = merge.all(data)
            return res.json(result);
          })
        }
        else
          return res.json(result);
      }).catch(error => {return http.internalServerError(req, res, error)});
    }
    else
      return http.permissionDenied(req, res);
  }
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

router.route('/:invitationId')
.all((req, res, next) => {
  admin.database().ref(`Invitations/${req.params.invitationId}`).once('value').then(snapshot => {
    if (snapshot.val())
      next();
    else
      return http.notFound(req, res);
  }).catch(error => {return http.internalServerError(req, res, error)});
})
/**
 * @api {get} /invitations/:invitationId Read data of the invitation
 * @apiName GetInvitation
 * @apiGroup UserInvitations
 * 
 * @apiParam {String} invitationId 邀請單 ID
 *
 * @apiSuccess {Boolean}  success                             API 執行成功與否
 * @apiSuccess {Object}   message                             執行結果
 * @apiSuccess {String}   message.invitationId                邀請單 ID
 * @apiSuccess {String}   message.invitationId.role           邀請加入的角色. ex:COMMUNITY_ADMIN
 * @apiSuccess {Object}   message.invitationId.inviteUser     邀請人資料
 * @apiSuccess {String}   message.invitationId.inviteUser.userId       邀請人 ID
 * @apiSuccess {String}   message.invitationId.inviteUser.userId.email 邀請人 email
 * @apiSuccess {String}   message.invitationId.inviteUser.userId.name  邀請人名稱
 * @apiSuccess {String}   message.invitationId.inviteUser.userId.photo 邀請人大頭貼 URL
 * @apiSuccess {Object}   message.invitationId.beInvitedUser     被邀請人資料
 * @apiSuccess {String}   message.invitationId.beInvitedUser.userId       被邀請人 ID
 * @apiSuccess {String}   message.invitationId.beInvitedUser.userId.email 被邀請人 email
 * @apiSuccess {String}   message.invitationId.beInvitedUser.userId.name  被邀請人名稱
 * @apiSuccess {String}   message.invitationId.beInvitedUser.userId.photo 被邀請人大頭貼 URL
 * @apiSuccess {Object}   message.invitationId.community               邀請加入的社區資料
 * @apiSuccess {String}   message.invitationId.community.communityId   社區 ID 
 * @apiSuccess {String}   message.invitationId.community.communityId.name 社區名稱
 * @apiSuccess {String}   message.invitationId.community.communityId.address 社區地址
 * @apiSuccess {Object}   [message.invitationId.householder]               邀請加入的住戶資料
 * @apiSuccess {String}   [message.invitationId.householder.householderId]   住戶 ID 
 * @apiSuccess {String}   [message.invitationId.householder.householderId.number] 住戶門牌號碼
 * @apiSuccess {String}   [message.invitationId.householder.householderId.floor]  住戶樓層
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "3iyCyxMP7RihqGsk": {
      "inviteUser": {
        "HOeBzcVmwyPTL3Kdl6abfQwIbx82": {
          "email": "root@cpig.com",
          "isPublic": true,
          "name": "system_admin",
          "photo": ""
        }
      },
      "role": "COMMUNITY_ADMIN",
      "beInvitedUser": {
        "6guc1Vmi9KfMJ5SgHkMs7sm6hE32": {
          "email": "user1@cpig.com",
          "isPublic": true,
          "name": "user1",
          "photo": ""
        }
      },
      "community": {
        "WtICybIMORvkOg4I": {
          "address": "address 2222",
          "name": "community 2"
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
  if (permission.isAllowed(req.user.permission, 'Invitations:other:read')) {
    admin.database().ref(`Invitations/${req.params.invitationId}`).once('value').then(snapshot => {
      var process = [];
      const invitationId = snapshot.key;
      const role = snapshot.val().role;
      const inviteUser = snapshot.val().inviteUser;
      const beInvitedUser = snapshot.val().beInvitedUser;
          
      process.push(
        admin.database().ref(`Users/${inviteUser}`).once('value').then(snapshot => {
          var data = {};
          data[invitationId] = { inviteUser:{}, role:role };
          data[invitationId]['inviteUser'][inviteUser] = snapshot.val();
          return data;
        })
      )
        
      process.push(
        admin.database().ref(`Users/${beInvitedUser}`).once('value').then(snapshot => {
          var data = {};
          data[invitationId] = { beInvitedUser:{} };
          data[invitationId]['beInvitedUser'][beInvitedUser] = snapshot.val();
          return data;
        })
      )
        
      if (role === 'COMMUNITY_ADMIN' || role === 'GUARD') {
        const communityId = snapshot.val().community;
        process.push(
          admin.database().ref(`Communities/${communityId}`).once('value').then(snapshot => {
            var data = {}
            data[invitationId] = { community:{} };
            data[invitationId]['community'][communityId] = snapshot.val();
            return data;
          })
        )
      }
      else if (role === 'RESIDENT' || role === 'RESIDENT_ADMIN') {
        
      }
      
      var result = {success:true, message:{}};
      if (process.length > 0) {
        Promise.all(process).then(data => {
          result.message = merge.all(data)
          return res.json(result);
        })
      }
      else
        return res.json(result);
    }).catch(error => {return http.internalServerError(req, res, error)});
  }
  else if (permission.isAllowed(req.user.permission, 'Invitations:own:read')) {
    admin.database().ref(`Invitations/${req.params.invitationId}`).once('value').then(snapshot => {
      const invitationId = snapshot.key;
      const role = snapshot.val().role;
      const inviteUser = snapshot.val().inviteUser;
      const beInvitedUser = snapshot.val().beInvitedUser;
      if (beInvitedUser === req.user.uid) {
        var process = [];
        process.push(
          admin.database().ref(`Users/${inviteUser}`).once('value').then(snapshot => {
            var data = {};
            data[invitationId] = { inviteUser:{}, role:role };
            data[invitationId]['inviteUser'][inviteUser] = snapshot.val();
            return data;
          })
        )
          
        process.push(
          admin.database().ref(`Users/${beInvitedUser}`).once('value').then(snapshot => {
            var data = {};
            data[invitationId] = { beInvitedUser:{} };
            data[invitationId]['beInvitedUser'][beInvitedUser] = snapshot.val();
            return data;
          })
        )
        
        if (role === 'COMMUNITY_ADMIN' || role === 'GUARD') {
          const communityId = snapshot.val().community;
          process.push(
            admin.database().ref(`Communities/${communityId}`).once('value').then(snapshot => {
              var data = {}
              data[invitationId] = { community:{} };
              data[invitationId]['community'][communityId] = snapshot.val();
              return data;
            })
          )
        }
        else if (role === 'RESIDENT' || role === 'RESIDENT_ADMIN') {
          // TODO
        }
      
        var result = {success:true, message:{}};
        if (process.length > 0) {
          Promise.all(process).then(data => {
            result.message = merge.all(data)
            return res.json(result);
          })
        }
        else
          return res.json(result);
      }
      else
        return http.permissionDenied(req, res);
    }).catch(error => {return http.internalServerError(req, res, error)});
  }
  else
    return http.permissionDenied(req, res);
})
/**
 * @api {delete} /invitations/:invitationId Reject the invitation
 * @apiName DeleteInvitation
 * @apiGroup UserInvitations
 * 
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
  if (permission.isAllowed(req.user.permission, 'Invitations:other:delete')) {
    admin.database().ref(`Invitations/${req.params.invitationId}`).remove()
    .then(() => {
      return res.json({success:true});  
    }).catch(error => {return http.internalServerError(req, res, error)});
  }
  else if (permission.isAllowed(req.user.permission, 'Invitations:own:delete')) {
    admin.database().ref(`Invitations/${req.params.invitationId}`).once('value')
    .then(snapshot => {
      if (snapshot.val().beInvitedUser === req.user.uid) {
        admin.database().ref(`Invitations/${req.params.invitationId}`).remove()
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

router.route('/:invitationId/accept')
/**
 * @api {post} /invitations/:invitationId/accept Accept the invitation
 * @apiName AcceptInvitation
 * @apiGroup UserInvitations
 * 
 * @apiParam {String} invitationId 邀請單 ID
 *
 * @apiSuccess {Boolean}  success API 執行成功與否
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
.post((req, res) => {
  if (permission.isAllowed(req.user.permission, 'Invitations:own:accept')) {
    admin.database().ref(`Invitations/${req.params.invitationId}`).once('value')
    .then(snapshot => {
      if (snapshot.val().beInvitedUser === req.user.uid) {
        const role = snapshot.val().role;
        const communityId = snapshot.val().community;
        const targetUid = snapshot.val().beInvitedUser;
        const invitationId = snapshot.key;
        if (role === 'COMMUNITY_ADMIN') {
          admin.database().ref(`CommunityMembers/${communityId}/COMMUNITY_ADMIN/${targetUid}`).set(true)
          .then(() => {
            return admin.database().ref(`UserRoles/${targetUid}/communities/${communityId}/COMMUNITY_ADMIN`).set(true) ;
          })
          .then(() => {
            return admin.database().ref(`InvitedCommunityAdmins/${communityId}/${invitationId}`).remove();
          })
          .then(() => {
            return admin.database().ref(`Invitations/${invitationId}`).remove();
          })
          .then(() => {
            return res.json({success:true});
          })
          .catch(error => {return http.internalServerError(req, res, error)});
        }
        else if (role === 'GUARD') {
          admin.database().ref(`CommunityMembers/${communityId}/GUARD/${targetUid}`).set(true)
          .then(() => {
            return admin.database().ref(`UserRoles/${targetUid}/communities/${communityId}/GUARD`).set(true) ;
          })
          .then(() => {
            return admin.database().ref(`InvitedGuards/${communityId}/${invitationId}`).remove();
          })
          .then(() => {
            return admin.database().ref(`Invitations/${invitationId}`).remove();
          })
          .then(() => {
            return res.json({success:true});
          })
          .catch(error => {return http.internalServerError(req, res, error)});
        }
        else if (role === 'RESIDENT') {
          // TODO
        }
        else if (role === 'RESIDENT_ADMIN') {
          // TODO
        }
      }
      else
        return http.permissionDenied(req, res);
    }).catch(error => {return http.internalServerError(req, res, error)});
  }
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

module.exports = router;