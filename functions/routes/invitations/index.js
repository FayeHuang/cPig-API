const express = require('express');
const router = express.Router();

const invitations = require("./invitations");
const invitation = require("./invitation");
const acceptInvitation = require("./acceptInvitation");
const communityInvitations = require("./communityInvitations");
const communityInvitation = require("./communityInvitation");
const householdInvitations = require("./householdInvitations");
const householdInvitation = require("./householdInvitation");
const communityBeInvitedUsers = require("./communityBeInvitedUsers");
const householdBeInvitedUsers = require("./householdBeInvitedUsers");

router.use('/user/invitations', invitations);
router.use('/user/invitations/:invitationId', invitation);
router.use('/user/invitations/:invitationId/accept', acceptInvitation);


router.use('/communities/:communityId/role/:role/beInvitedUsers', communityBeInvitedUsers);
router.use('/communities/:communityId/role/:role/invitations', communityInvitations);
router.use('/communities/:communityId/role/:role/invitations/:invitationId', communityInvitation);

router.use('/communities/:communityId/households/:householdId/role/:role/beInvitedUsers', householdBeInvitedUsers);
router.use('/communities/:communityId/households/:householdId/role/:role/invitations', householdInvitations);
router.use('/communities/:communityId/households/:householdId/role/:role/invitations/:invitationId', householdInvitation);


module.exports = router;

//  [GET]     /user/invitations
/**
 * @api {get} /user/invitations Read data of user invitations
 * @apiName GetInvitations
 * @apiGroup Invitations
 * 
 * @apiParam (Query string) {Boolean} [all] if true, 取得所有邀請單資料. if false, 取得自己的邀請單資料.
 *
 * @apiSuccess {Boolean}  success                             API 執行成功與否
 * @apiSuccess {Object[]}   message                             執行結果
 * @apiSuccess {String}   message.id                邀請單 ID
 * @apiSuccess {String}   message.role           邀請加入的角色. ex:COMMUNITY_ADMIN
 * @apiSuccess {String}   message.createTime  邀請單建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.inviteUser     邀請人資料
 * @apiSuccess {String}   message.inviteUser.id       邀請人 ID
 * @apiSuccess {String}   message.inviteUser.email 邀請人 email
 * @apiSuccess {String}   message.inviteUser.name  邀請人名稱
 * @apiSuccess {String}   message.inviteUser.photo 邀請人大頭貼 URL
 * @apiSuccess {Object}   message.beInvitedUser     被邀請人資料
 * @apiSuccess {String}   message.beInvitedUser.id       被邀請人 ID
 * @apiSuccess {String}   message.beInvitedUser.email 被邀請人 email
 * @apiSuccess {String}   message.beInvitedUser.name  被邀請人名稱
 * @apiSuccess {String}   message.beInvitedUser.photo 被邀請人大頭貼 URL
 * @apiSuccess {Object}   message.community               邀請加入的社區資料
 * @apiSuccess {String}   message.community.id 社區 ID
 * @apiSuccess {String}   message.community.name 社區名稱
 * @apiSuccess {String}   message.community.address 社區地址
 * @apiSuccess {String}   message.community.createTime 社區建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.community.sn 社區序號
 * @apiSuccess {String}   message.community.photo 社區圖片 URL
 * @apiSuccess {Object}   message.community.createUser  社區建立人
 * @apiSuccess {String}   message.community.createUser.id  建立人 ID
 * @apiSuccess {String}   message.community.createUser.email  建立人 Email
 * @apiSuccess {String}   message.community.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.community.createUser.photo  建立人大頭貼 URL
 * @apiSuccess {Object}   [message.householder]               邀請加入的住戶資料
 * @apiSuccess {String}   [message.householder.id]        住戶 ID
 * @apiSuccess {String}   [message.householder.floor]   住戶樓層
 * @apiSuccess {String}   [message.householder.number]  住戶門牌號碼
 * @apiSuccess {String}   [message.householder.createTime]  住戶建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   [message.householder.createUser] 住戶建立人
 * @apiSuccess {String}   [message.householder.createUser.id]  建立人 ID
 * @apiSuccess {String}   [message.householder.createUser.email]  建立人 Email
 * @apiSuccess {String}   [message.householder.createUser.name]  建立人暱稱
 * @apiSuccess {String}   [message.householder.createUser.photo]  建立人大頭貼
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": [
    {
      "id": "H7ieirlurU4ewsl5",
      "createTime": 1497098398557,
      "beInvitedUser": {
        "id": "6guc1Vmi9KfMJ5SgHkMs7sm6hE32",
        "email": "user1@cpig.com",
        "name": "user1",
        "photo": ""
      },
      "community": {
        "id": "hQcpuyY6H0envkI4",
        "address": "松勤路",
        "createTime": 1497020996855,
        "createUser": {
          "id": "WSvJfECtRMcSTg5E4bovG1bMJiy2",
          "email": "yongling225@gmail.com",
          "name": "John",
          "photo": ""
        },
        "name": "宜誠天匯",
        "photo": "",
        "sn": "009490"
      },
      "inviteUser": {
        "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
        "email": "root@cpig.com",
        "name": "system_admin",
        "photo": ""
      },
      "role": "GUARD"
    }
  ]
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [GET]     /user/invitations/:invitationId
/**
 * @api {get} /user/invitations/:invitationId Read data of the invitation
 * @apiName GetInvitation
 * @apiGroup Invitations
 * 
 * @apiParam {String} invitationId 邀請單 ID
 *
 * @apiSuccess {Boolean}  success                             API 執行成功與否
 * @apiSuccess {Object}   message                             執行結果
 * @apiSuccess {String}   message.id                邀請單 ID
 * @apiSuccess {String}   message.role           邀請加入的角色. ex:COMMUNITY_ADMIN
 * @apiSuccess {String}   message.createTime  邀請單建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.inviteUser     邀請人資料
 * @apiSuccess {String}   message.inviteUser.id       邀請人 ID
 * @apiSuccess {String}   message.inviteUser.email 邀請人 email
 * @apiSuccess {String}   message.inviteUser.name  邀請人名稱
 * @apiSuccess {String}   message.inviteUser.photo 邀請人大頭貼 URL
 * @apiSuccess {Object}   message.beInvitedUser     被邀請人資料
 * @apiSuccess {String}   message.beInvitedUser.id       被邀請人 ID
 * @apiSuccess {String}   message.beInvitedUser.email 被邀請人 email
 * @apiSuccess {String}   message.beInvitedUser.name  被邀請人名稱
 * @apiSuccess {String}   message.beInvitedUser.photo 被邀請人大頭貼 URL
 * @apiSuccess {Object}   message.community               邀請加入的社區資料
 * @apiSuccess {String}   message.community.id 社區 ID
 * @apiSuccess {String}   message.community.name 社區名稱
 * @apiSuccess {String}   message.community.address 社區地址
 * @apiSuccess {String}   message.community.createTime 社區建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.community.sn 社區序號
 * @apiSuccess {String}   message.community.photo 社區圖片 URL
 * @apiSuccess {Object}   message.community.createUser  社區建立人
 * @apiSuccess {String}   message.community.createUser.id  建立人 ID
 * @apiSuccess {String}   message.community.createUser.email  建立人 Email
 * @apiSuccess {String}   message.community.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.community.createUser.photo  建立人大頭貼 URL
 * @apiSuccess {Object}   [message.householder]               邀請加入的住戶資料
 * @apiSuccess {String}   [message.householder.id]        住戶 ID
 * @apiSuccess {String}   [message.householder.floor]   住戶樓層
 * @apiSuccess {String}   [message.householder.number]  住戶門牌號碼
 * @apiSuccess {String}   [message.householder.createTime]  住戶建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   [message.householder.createUser] 住戶建立人
 * @apiSuccess {String}   [message.householder.createUser.id]  建立人 ID
 * @apiSuccess {String}   [message.householder.createUser.email]  建立人 Email
 * @apiSuccess {String}   [message.householder.createUser.name]  建立人暱稱
 * @apiSuccess {String}   [message.householder.createUser.photo]  建立人大頭貼
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "id": "H7ieirlurU4ewsl5",
    "createTime": 1497098398557,
    "beInvitedUser": {
      "id": "6guc1Vmi9KfMJ5SgHkMs7sm6hE32",
      "email": "user1@cpig.com",
      "name": "user1",
      "photo": ""
    },
    "community": {
      "id": "hQcpuyY6H0envkI4",
      "address": "松勤路",
      "createTime": 1497020996855,
      "createUser": {
        "id": "WSvJfECtRMcSTg5E4bovG1bMJiy2",
        "email": "yongling225@gmail.com",
        "name": "John",
        "photo": ""
      },
      "name": "宜誠天匯",
      "photo": "",
      "sn": "009490"
    },
    "inviteUser": {
      "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
      "email": "root@cpig.com",
      "name": "system_admin",
      "photo": ""
    },
    "role": "GUARD"
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */
 
//  [DELETE]  /user/invitations/:invitationId
/**
 * @api {delete} /user/invitations/:invitationId Reject the invitation
 * @apiName DeleteInvitation
 * @apiGroup Invitations
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
 
//  [POST]    /user/invitations/:invitationId/accept
/**
 * @api {post} /user/invitations/:invitationId/accept Accept the invitation
 * @apiName AcceptInvitation
 * @apiGroup Invitations
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

//  [GET]     /communities/:communityId/role/:role/beInvitedUsers
/**
 * @api {get} /communities/:communityId/role/:role/beInvitedUsers Read data of possible be invited users in community
 * @apiName GetBeInvitedUsersInCommunity
 * @apiGroup Invitations
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} role 角色 (ex: COMMUNITY_ADMIN)
 *
 * @apiSuccess {Boolean}  success                             API 執行成功與否
 * @apiSuccess {Object[]}   message                             執行結果
 * @apiSuccess {String}   message.id       邀請人 ID
 * @apiSuccess {String}   message.email 邀請人 email
 * @apiSuccess {String}   message.name  邀請人名稱
 * @apiSuccess {String}   message.photo 邀請人大頭貼 URL
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": [
    {
      "email": "user3@cpig.com",
      "name": "user345",
      "photo": "",
      "id": "4TOdMx4EsEdVKJc5vd2QCZkes902"
    }
  ]
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [GET]     /communities/:communityId/role/:role/invitations
/**
 * @api {get} /communities/:communityId/role/:role/invitations Read data of specific role invitations in community
 * @apiName GetInvitationsInCommunity
 * @apiGroup Invitations
 * 
 * @apiParam (Query string) {Boolean} [all] if true, 取得所有邀請單資料. if false, 取得自己的邀請單資料.
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} role 角色 (ex: COMMUNITY_ADMIN)
 *
 * @apiSuccess {Boolean}  success                             API 執行成功與否
 * @apiSuccess {Object[]}   message                             執行結果
 * @apiSuccess {String}   message.id                邀請單 ID
 * @apiSuccess {String}   message.role           邀請加入的角色. ex:COMMUNITY_ADMIN
 * @apiSuccess {String}   message.createTime  邀請單建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.inviteUser     邀請人資料
 * @apiSuccess {String}   message.inviteUser.id       邀請人 ID
 * @apiSuccess {String}   message.inviteUser.email 邀請人 email
 * @apiSuccess {String}   message.inviteUser.name  邀請人名稱
 * @apiSuccess {String}   message.inviteUser.photo 邀請人大頭貼 URL
 * @apiSuccess {Object}   message.beInvitedUser     被邀請人資料
 * @apiSuccess {String}   message.beInvitedUser.id       被邀請人 ID
 * @apiSuccess {String}   message.beInvitedUser.email 被邀請人 email
 * @apiSuccess {String}   message.beInvitedUser.name  被邀請人名稱
 * @apiSuccess {String}   message.beInvitedUser.photo 被邀請人大頭貼 URL
 * @apiSuccess {Object}   message.community               邀請加入的社區資料
 * @apiSuccess {String}   message.community.id 社區 ID
 * @apiSuccess {String}   message.community.name 社區名稱
 * @apiSuccess {String}   message.community.address 社區地址
 * @apiSuccess {String}   message.community.createTime 社區建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.community.sn 社區序號
 * @apiSuccess {String}   message.community.photo 社區圖片 URL
 * @apiSuccess {Object}   message.community.createUser  社區建立人
 * @apiSuccess {String}   message.community.createUser.id  建立人 ID
 * @apiSuccess {String}   message.community.createUser.email  建立人 Email
 * @apiSuccess {String}   message.community.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.community.createUser.photo  建立人大頭貼 URL
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": [
    {
      "id": "H7ieirlurU4ewsl5",
      "createTime": 1497098398557,
      "beInvitedUser": {
        "id": "6guc1Vmi9KfMJ5SgHkMs7sm6hE32",
        "email": "user1@cpig.com",
        "name": "user1",
        "photo": ""
      },
      "community": {
        "id": "hQcpuyY6H0envkI4",
        "address": "松勤路",
        "createTime": 1497020996855,
        "createUser": {
          "id": "WSvJfECtRMcSTg5E4bovG1bMJiy2",
          "email": "yongling225@gmail.com",
          "name": "John",
          "photo": ""
        },
        "name": "宜誠天匯",
        "photo": "",
        "sn": "009490"
      },
      "inviteUser": {
        "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
        "email": "root@cpig.com",
        "name": "system_admin",
        "photo": ""
      },
      "role": "GUARD"
    }
  ]
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [POST]    /communities/:communityId/role/:role/invitations
/**
 * @api {post} /communities/:communityId/role/:role/invitations Invite someone become specific role in community
 * @apiName PostInvitationsInCommunity
 * @apiGroup Invitations
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} role 角色 (ex: COMMUNITY_ADMIN)
 * 
 * @apiParam (Request Body) {String} user 被邀請人 ID
 * @apiParamExample {json} Request-Example:
 *  {
 *    "user": "6guc1Vmi9KfMJ5SgHkMs7sm6hE32"
 *  }
 *
 * @apiSuccess {Boolean}  success                             API 執行成功與否
 * @apiSuccess {Object}   message                             執行結果
 * @apiSuccess {String}   message.id                邀請單 ID
 * @apiSuccess {String}   message.role           邀請加入的角色. ex:COMMUNITY_ADMIN
 * @apiSuccess {String}   message.createTime  邀請單建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.inviteUser     邀請人資料
 * @apiSuccess {String}   message.inviteUser.id       邀請人 ID
 * @apiSuccess {String}   message.inviteUser.email 邀請人 email
 * @apiSuccess {String}   message.inviteUser.name  邀請人名稱
 * @apiSuccess {String}   message.inviteUser.photo 邀請人大頭貼 URL
 * @apiSuccess {Object}   message.beInvitedUser     被邀請人資料
 * @apiSuccess {String}   message.beInvitedUser.id       被邀請人 ID
 * @apiSuccess {String}   message.beInvitedUser.email 被邀請人 email
 * @apiSuccess {String}   message.beInvitedUser.name  被邀請人名稱
 * @apiSuccess {String}   message.beInvitedUser.photo 被邀請人大頭貼 URL
 * @apiSuccess {Object}   message.community               邀請加入的社區資料
 * @apiSuccess {String}   message.community.id 社區 ID
 * @apiSuccess {String}   message.community.name 社區名稱
 * @apiSuccess {String}   message.community.address 社區地址
 * @apiSuccess {String}   message.community.createTime 社區建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.community.sn 社區序號
 * @apiSuccess {String}   message.community.photo 社區圖片 URL
 * @apiSuccess {Object}   message.community.createUser  社區建立人
 * @apiSuccess {String}   message.community.createUser.id  建立人 ID
 * @apiSuccess {String}   message.community.createUser.email  建立人 Email
 * @apiSuccess {String}   message.community.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.community.createUser.photo  建立人大頭貼 URL
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "id": "H7ieirlurU4ewsl5",
    "createTime": 1497098398557,
    "beInvitedUser": {
      "id": "6guc1Vmi9KfMJ5SgHkMs7sm6hE32",
      "email": "user1@cpig.com",
      "name": "user1",
      "photo": ""
    },
    "community": {
      "id": "hQcpuyY6H0envkI4",
      "address": "松勤路",
      "createTime": 1497020996855,
      "createUser": {
        "id": "WSvJfECtRMcSTg5E4bovG1bMJiy2",
        "email": "yongling225@gmail.com",
        "name": "John",
        "photo": ""
      },
      "name": "宜誠天匯",
      "photo": "",
      "sn": "009490"
    },
    "inviteUser": {
      "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
      "email": "root@cpig.com",
      "name": "system_admin",
      "photo": ""
    },
    "role": "GUARD"
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [GET]     /communities/:communityId/role/:role/invitations/:invitationId
/**
 * @api {get} /communities/:communityId/role/:role/invitations/:invitationId Read data of specific role invitation in community
 * @apiName GetInvitationInCommunity
 * @apiGroup Invitations
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} role 角色 (ex: COMMUNITY_ADMIN)
 * @apiParam {String} invitationId 邀請單 ID
 *
 * @apiSuccess {Boolean}  success                             API 執行成功與否
 * @apiSuccess {Object}   message                             執行結果
 * @apiSuccess {String}   message.id                邀請單 ID
 * @apiSuccess {String}   message.role           邀請加入的角色. ex:COMMUNITY_ADMIN
 * @apiSuccess {String}   message.createTime  邀請單建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.inviteUser     邀請人資料
 * @apiSuccess {String}   message.inviteUser.id       邀請人 ID
 * @apiSuccess {String}   message.inviteUser.email 邀請人 email
 * @apiSuccess {String}   message.inviteUser.name  邀請人名稱
 * @apiSuccess {String}   message.inviteUser.photo 邀請人大頭貼 URL
 * @apiSuccess {Object}   message.beInvitedUser     被邀請人資料
 * @apiSuccess {String}   message.beInvitedUser.id       被邀請人 ID
 * @apiSuccess {String}   message.beInvitedUser.email 被邀請人 email
 * @apiSuccess {String}   message.beInvitedUser.name  被邀請人名稱
 * @apiSuccess {String}   message.beInvitedUser.photo 被邀請人大頭貼 URL
 * @apiSuccess {Object}   message.community               邀請加入的社區資料
 * @apiSuccess {String}   message.community.id 社區 ID
 * @apiSuccess {String}   message.community.name 社區名稱
 * @apiSuccess {String}   message.community.address 社區地址
 * @apiSuccess {String}   message.community.createTime 社區建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.community.sn 社區序號
 * @apiSuccess {String}   message.community.photo 社區圖片 URL
 * @apiSuccess {Object}   message.community.createUser  社區建立人
 * @apiSuccess {String}   message.community.createUser.id  建立人 ID
 * @apiSuccess {String}   message.community.createUser.email  建立人 Email
 * @apiSuccess {String}   message.community.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.community.createUser.photo  建立人大頭貼 URL
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "id": "H7ieirlurU4ewsl5",
    "createTime": 1497098398557,
    "beInvitedUser": {
      "id": "6guc1Vmi9KfMJ5SgHkMs7sm6hE32",
      "email": "user1@cpig.com",
      "name": "user1",
      "photo": ""
    },
    "community": {
      "id": "hQcpuyY6H0envkI4",
      "address": "松勤路",
      "createTime": 1497020996855,
      "createUser": {
        "id": "WSvJfECtRMcSTg5E4bovG1bMJiy2",
        "email": "yongling225@gmail.com",
        "name": "John",
        "photo": ""
      },
      "name": "宜誠天匯",
      "photo": "",
      "sn": "009490"
    },
    "inviteUser": {
      "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
      "email": "root@cpig.com",
      "name": "system_admin",
      "photo": ""
    },
    "role": "GUARD"
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [DELETE]  /communities/:communityId/role/:role/invitations/:invitationId
/**
 * @api {delete} /communities/:communityId/role/:role/invitations/:invitationId Delete specific role invitation in community
 * @apiName DeleteInvitationInCommunity
 * @apiGroup Invitations
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} role 角色 (ex: COMMUNITY_ADMIN)
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

//  [GET]     /communities/:communityId/households/:householdId/role/:role/beInvitedUsers
/**
 * @api {get} /communities/:communityId/households/:householdId/role/:role/beInvitedUsers Read data of possible be invited users in household
 * @apiName GetBeInvitedUsersInHousehold
 * @apiGroup Invitations
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} householdId 住戶 ID
 * @apiParam {String} role 角色 (ex: RESIDENT)
 *
 * @apiSuccess {Boolean}  success                             API 執行成功與否
 * @apiSuccess {Object[]}   message                             執行結果
 * @apiSuccess {String}   message.id       邀請人 ID
 * @apiSuccess {String}   message.email 邀請人 email
 * @apiSuccess {String}   message.name  邀請人名稱
 * @apiSuccess {String}   message.photo 邀請人大頭貼 URL
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": [
    {
      "email": "user3@cpig.com",
      "name": "user345",
      "photo": "",
      "id": "4TOdMx4EsEdVKJc5vd2QCZkes902"
    }
  ]
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [GET]     /communities/:communityId/households/:householdId/role/:role/invitations
/**
 * @api {get} /communities/:communityId/households/:householdId/role/:role/invitations Read data of specific role invitations in household
 * @apiName GetInvitationsInHousehold
 * @apiGroup Invitations
 * 
 * @apiParam (Query string) {Boolean} [all] if true, 取得所有邀請單資料. if false, 取得自己的邀請單資料.
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} householdId 住戶 ID
 * @apiParam {String} role 角色 (ex: RESIDENT)
 *
 * @apiSuccess {Boolean}  success                             API 執行成功與否
 * @apiSuccess {Object[]}   message                             執行結果
 * @apiSuccess {String}   message.id                邀請單 ID
 * @apiSuccess {String}   message.role           邀請加入的角色. ex:COMMUNITY_ADMIN
 * @apiSuccess {String}   message.createTime  邀請單建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.inviteUser     邀請人資料
 * @apiSuccess {String}   message.inviteUser.id       邀請人 ID
 * @apiSuccess {String}   message.inviteUser.email 邀請人 email
 * @apiSuccess {String}   message.inviteUser.name  邀請人名稱
 * @apiSuccess {String}   message.inviteUser.photo 邀請人大頭貼 URL
 * @apiSuccess {Object}   message.beInvitedUser     被邀請人資料
 * @apiSuccess {String}   message.beInvitedUser.id       被邀請人 ID
 * @apiSuccess {String}   message.beInvitedUser.email 被邀請人 email
 * @apiSuccess {String}   message.beInvitedUser.name  被邀請人名稱
 * @apiSuccess {String}   message.beInvitedUser.photo 被邀請人大頭貼 URL
 * @apiSuccess {Object}   message.community               邀請加入的社區資料
 * @apiSuccess {String}   message.community.id 社區 ID
 * @apiSuccess {String}   message.community.name 社區名稱
 * @apiSuccess {String}   message.community.address 社區地址
 * @apiSuccess {String}   message.community.createTime 社區建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.community.sn 社區序號
 * @apiSuccess {String}   message.community.photo 社區圖片 URL
 * @apiSuccess {Object}   message.community.createUser  社區建立人
 * @apiSuccess {String}   message.community.createUser.id  建立人 ID
 * @apiSuccess {String}   message.community.createUser.email  建立人 Email
 * @apiSuccess {String}   message.community.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.community.createUser.photo  建立人大頭貼 URL
 * @apiSuccess {Object}   message.householder               邀請加入的住戶資料
 * @apiSuccess {String}   message.householder.id        住戶 ID
 * @apiSuccess {String}   message.householder.floor   住戶樓層
 * @apiSuccess {String}   message.householder.number  住戶門牌號碼
 * @apiSuccess {String}   message.householder.createTime  住戶建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.householder.createUser 住戶建立人
 * @apiSuccess {String}   message.householder.createUser.id  建立人 ID
 * @apiSuccess {String}   message.householder.createUser.email  建立人 Email
 * @apiSuccess {String}   message.householder.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.householder.createUser.photo  建立人大頭貼
 
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": [
    {
      "id": "htssEv5KOKjNgpBM",
      "createTime": 1497098398557,
      "beInvitedUser": {
        "id": "2KK70qWWUpOFuY9R9xDneMyPjVY2",
        "email": "faye1821@gmail.com",
        "name": "Mary",
        "photo": ""
      },
      "community": {
        "id": "hQcpuyY6H0envkI4",
        "address": "松勤路",
        "createTime": 1497020996855,
        "createUser": {
          "id": "WSvJfECtRMcSTg5E4bovG1bMJiy2",
          "email": "yongling225@gmail.com",
          "name": "John",
          "photo": ""
        },
        "name": "宜誠天匯",
        "photo": "",
        "sn": "009490"
      },
      "household": {
        "id": "i54xyZvdBg1aPQCg",
        "createTime": 1497095978390,
        "createUser": {
          "id": "6guc1Vmi9KfMJ5SgHkMs7sm6hE32",
          "email": "user1@cpig.com",
          "name": "user1",
          "photo": ""
        },
        "floor": "174",
        "number": "174"
      },
      "inviteUser": {
        "id": "6guc1Vmi9KfMJ5SgHkMs7sm6hE32",
        "email": "user1@cpig.com",
        "name": "user1",
        "photo": ""
      },
      "role": "RESIDENT"
    }
  ]
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [POST]    /communities/:communityId/households/:householdId/role/:role/invitations
/**
 * @api {post} /communities/:communityId/households/:householdId/role/:role/invitations Invite someone become specific role in household
 * @apiName PostInvitationsInHousehold
 * @apiGroup Invitations
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} householdId 住戶 ID
 * @apiParam {String} role 角色 (ex: RESIDENT)
 * 
 * @apiParam (Request Body) {String} user 被邀請人 ID
 * @apiParamExample {json} Request-Example:
 *  {
 *    "user": "6guc1Vmi9KfMJ5SgHkMs7sm6hE32"
 *  }
 *
 * @apiSuccess {Boolean}  success                             API 執行成功與否
 * @apiSuccess {Object}   message                             執行結果
 * @apiSuccess {String}   message.id                邀請單 ID
 * @apiSuccess {String}   message.role           邀請加入的角色. ex:COMMUNITY_ADMIN
 * @apiSuccess {String}   message.createTime  邀請單建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.inviteUser     邀請人資料
 * @apiSuccess {String}   message.inviteUser.id       邀請人 ID
 * @apiSuccess {String}   message.inviteUser.email 邀請人 email
 * @apiSuccess {String}   message.inviteUser.name  邀請人名稱
 * @apiSuccess {String}   message.inviteUser.photo 邀請人大頭貼 URL
 * @apiSuccess {Object}   message.beInvitedUser     被邀請人資料
 * @apiSuccess {String}   message.beInvitedUser.id       被邀請人 ID
 * @apiSuccess {String}   message.beInvitedUser.email 被邀請人 email
 * @apiSuccess {String}   message.beInvitedUser.name  被邀請人名稱
 * @apiSuccess {String}   message.beInvitedUser.photo 被邀請人大頭貼 URL
 * @apiSuccess {Object}   message.community               邀請加入的社區資料
 * @apiSuccess {String}   message.community.id 社區 ID
 * @apiSuccess {String}   message.community.name 社區名稱
 * @apiSuccess {String}   message.community.address 社區地址
 * @apiSuccess {String}   message.community.createTime 社區建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.community.sn 社區序號
 * @apiSuccess {String}   message.community.photo 社區圖片 URL
 * @apiSuccess {Object}   message.community.createUser  社區建立人
 * @apiSuccess {String}   message.community.createUser.id  建立人 ID
 * @apiSuccess {String}   message.community.createUser.email  建立人 Email
 * @apiSuccess {String}   message.community.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.community.createUser.photo  建立人大頭貼 URL
 * @apiSuccess {Object}   message.householder               邀請加入的住戶資料
 * @apiSuccess {String}   message.householder.id        住戶 ID
 * @apiSuccess {String}   message.householder.floor   住戶樓層
 * @apiSuccess {String}   message.householder.number  住戶門牌號碼
 * @apiSuccess {String}   message.householder.createTime  住戶建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.householder.createUser 住戶建立人
 * @apiSuccess {String}   message.householder.createUser.id  建立人 ID
 * @apiSuccess {String}   message.householder.createUser.email  建立人 Email
 * @apiSuccess {String}   message.householder.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.householder.createUser.photo  建立人大頭貼
 
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "id": "htssEv5KOKjNgpBM",
    "beInvitedUser": {
      "id": "2KK70qWWUpOFuY9R9xDneMyPjVY2",
      "email": "faye1821@gmail.com",
      "name": "",
      "photo": ""
    },
    "community": {
      "id": "hQcpuyY6H0envkI4",
      "createTime": 1497098398557,
      "address": "松勤路",
      "createTime": 1497020996855,
      "createUser": {
        "id": "WSvJfECtRMcSTg5E4bovG1bMJiy2",
        "email": "yongling225@gmail.com",
        "name": "John",
        "photo": ""
      },
      "name": "宜誠天匯",
      "photo": "",
      "sn": "009490"
    },
    "household": {
      "id": "i54xyZvdBg1aPQCg",
      "createTime": 1497095978390,
      "createUser": {
        "id": "6guc1Vmi9KfMJ5SgHkMs7sm6hE32",
        "email": "user1@cpig.com",
        "name": "user1",
        "photo": ""
      },
      "floor": "174",
      "number": "174"
    },
    "inviteUser": {
      "id": "6guc1Vmi9KfMJ5SgHkMs7sm6hE32",
      "email": "user1@cpig.com",
      "name": "user1",
      "photo": ""
    },
    "role": "RESIDENT"
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [GET]     /communities/:communityId/households/:householdId/role/:role/invitations/:invitationId
/**
 * @api {get} /communities/:communityId/households/:householdId/role/:role/invitations/:invitationId Read data of specific role invitation in household
 * @apiName GetInvitationInHousehold
 * @apiGroup Invitations
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} householdId 住戶 ID
 * @apiParam {String} role 角色 (ex: RESIDENT)
 * @apiParam {String} invitationId 邀請單 ID
 *
 * @apiSuccess {Boolean}  success                             API 執行成功與否
 * @apiSuccess {Object}   message                             執行結果
 * @apiSuccess {String}   message.id                邀請單 ID
 * @apiSuccess {String}   message.role           邀請加入的角色. ex:COMMUNITY_ADMIN
 * @apiSuccess {String}   message.createTime  邀請單建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.inviteUser     邀請人資料
 * @apiSuccess {String}   message.inviteUser.id       邀請人 ID
 * @apiSuccess {String}   message.inviteUser.email 邀請人 email
 * @apiSuccess {String}   message.inviteUser.name  邀請人名稱
 * @apiSuccess {String}   message.inviteUser.photo 邀請人大頭貼 URL
 * @apiSuccess {Object}   message.beInvitedUser     被邀請人資料
 * @apiSuccess {String}   message.beInvitedUser.id       被邀請人 ID
 * @apiSuccess {String}   message.beInvitedUser.email 被邀請人 email
 * @apiSuccess {String}   message.beInvitedUser.name  被邀請人名稱
 * @apiSuccess {String}   message.beInvitedUser.photo 被邀請人大頭貼 URL
 * @apiSuccess {Object}   message.community               邀請加入的社區資料
 * @apiSuccess {String}   message.community.id 社區 ID
 * @apiSuccess {String}   message.community.name 社區名稱
 * @apiSuccess {String}   message.community.address 社區地址
 * @apiSuccess {String}   message.community.createTime 社區建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.community.sn 社區序號
 * @apiSuccess {String}   message.community.photo 社區圖片 URL
 * @apiSuccess {Object}   message.community.createUser  社區建立人
 * @apiSuccess {String}   message.community.createUser.id  建立人 ID
 * @apiSuccess {String}   message.community.createUser.email  建立人 Email
 * @apiSuccess {String}   message.community.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.community.createUser.photo  建立人大頭貼 URL
 * @apiSuccess {Object}   message.householder               邀請加入的住戶資料
 * @apiSuccess {String}   message.householder.id        住戶 ID
 * @apiSuccess {String}   message.householder.floor   住戶樓層
 * @apiSuccess {String}   message.householder.number  住戶門牌號碼
 * @apiSuccess {String}   message.householder.createTime  住戶建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.householder.createUser 住戶建立人
 * @apiSuccess {String}   message.householder.createUser.id  建立人 ID
 * @apiSuccess {String}   message.householder.createUser.email  建立人 Email
 * @apiSuccess {String}   message.householder.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.householder.createUser.photo  建立人大頭貼
 
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "id": "htssEv5KOKjNgpBM",
    "createTime": 1497098398557,
    "beInvitedUser": {
      "id": "2KK70qWWUpOFuY9R9xDneMyPjVY2",
      "email": "faye1821@gmail.com",
      "name": "Mary",
      "photo": ""
    },
    "community": {
      "id": "hQcpuyY6H0envkI4",
      "address": "松勤路",
      "createTime": 1497020996855,
      "createUser": {
        "id": "WSvJfECtRMcSTg5E4bovG1bMJiy2",
        "email": "yongling225@gmail.com",
        "name": "John",
        "photo": ""
      },
      "name": "宜誠天匯",
      "photo": "",
      "sn": "009490"
    },
    "household": {
      "id": "i54xyZvdBg1aPQCg",
      "createTime": 1497095978390,
      "createUser": {
        "id": "6guc1Vmi9KfMJ5SgHkMs7sm6hE32",
        "email": "user1@cpig.com",
        "name": "user1",
        "photo": ""
      },
      "floor": "174",
      "number": "174"
    },
    "inviteUser": {
      "id": "6guc1Vmi9KfMJ5SgHkMs7sm6hE32",
      "email": "user1@cpig.com",
      "name": "user1",
      "photo": ""
    },
    "role": "RESIDENT"
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [DELETE]  /communities/:communityId/households/:householdId/role/:role/invitations/:invitationId
/**
 * @api {delete} /communities/:communityId/households/:householdId/role/:role/invitations/:invitationId Delete specific role invitation in household
 * @apiName DeleteInvitationInHousehold
 * @apiGroup Invitations
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} householdId 住戶 ID
 * @apiParam {String} role 角色 (ex: RESIDENT)
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