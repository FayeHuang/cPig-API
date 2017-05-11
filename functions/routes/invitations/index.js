const express = require('express');
const router = express.Router();

const invitations = require("./invitations");
const invitation = require("./invitation");
const acceptInvitation = require("./acceptInvitation");
const communityInvitations = require("./communityInvitations");
const communityInvitation = require("./communityInvitation");
const householdInvitations = require("./householdInvitations")
const householdInvitation = require("./householdInvitation")

router.use('/user/invitations', invitations);
router.use('/user/invitations/:invitationId', invitation);
router.use('/user/invitations/:invitationId/accept', acceptInvitation);

router.use('/communities/:communityId/role/:role/invitations', communityInvitations);
router.use('/communities/:communityId/role/:role/invitations/:invitationId', communityInvitation);

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
    "lU6Flo5tMUKXAHlQ": {
      "beInvitedUser": {
        "6guc1Vmi9KfMJ5SgHkMs7sm6hE32": {
          "email": "user1@cpig.com",
          "name": "user1",
          "photo": ""
        }
      },
      "role": "RESIDENT_ADMIN",
      "inviteUser": {
        "HOeBzcVmwyPTL3Kdl6abfQwIbx82": {
          "email": "root@cpig.com",
          "name": "system_admin",
          "photo": ""
        }
      },
      "community": {
        "0gFNpjr7SflMxw7Y": {
          "address": "community 624 address",
          "name": "community 624"
        }
      },
      "household": {
        "6XimnblO5LFRSqIJ": {
          "floor": "323",
          "number": "323"
        }
      }
    }
  }
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
    "lU6Flo5tMUKXAHlQ": {
      "beInvitedUser": {
        "6guc1Vmi9KfMJ5SgHkMs7sm6hE32": {
          "email": "user1@cpig.com",
          "name": "user1",
          "photo": ""
        }
      },
      "role": "RESIDENT_ADMIN",
      "inviteUser": {
        "HOeBzcVmwyPTL3Kdl6abfQwIbx82": {
          "email": "root@cpig.com",
          "name": "system_admin",
          "photo": ""
        }
      },
      "community": {
        "0gFNpjr7SflMxw7Y": {
          "address": "community 624 address",
          "name": "community 624"
        }
      },
      "household": {
        "6XimnblO5LFRSqIJ": {
          "floor": "323",
          "number": "323"
        }
      }
    }
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
 
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "lU6Flo5tMUKXAHlQ": {
      "beInvitedUser": {
        "6guc1Vmi9KfMJ5SgHkMs7sm6hE32": {
          "email": "user1@cpig.com",
          "name": "user1",
          "photo": ""
        }
      },
      "role": "COMMUNITY_ADMIN",
      "inviteUser": {
        "HOeBzcVmwyPTL3Kdl6abfQwIbx82": {
          "email": "root@cpig.com",
          "name": "system_admin",
          "photo": ""
        }
      },
      "community": {
        "0gFNpjr7SflMxw7Y": {
          "address": "community 624 address",
          "name": "community 624"
        }
      }
    }
  }
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
 
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "lU6Flo5tMUKXAHlQ": {
      "beInvitedUser": {
        "6guc1Vmi9KfMJ5SgHkMs7sm6hE32": {
          "email": "user1@cpig.com",
          "name": "user1",
          "photo": ""
        }
      },
      "role": "COMMUNITY_ADMIN",
      "inviteUser": {
        "HOeBzcVmwyPTL3Kdl6abfQwIbx82": {
          "email": "root@cpig.com",
          "name": "system_admin",
          "photo": ""
        }
      },
      "community": {
        "0gFNpjr7SflMxw7Y": {
          "address": "community 624 address",
          "name": "community 624"
        }
      }
    }
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
 
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "lU6Flo5tMUKXAHlQ": {
      "beInvitedUser": {
        "6guc1Vmi9KfMJ5SgHkMs7sm6hE32": {
          "email": "user1@cpig.com",
          "name": "user1",
          "photo": ""
        }
      },
      "role": "COMMUNITY_ADMIN",
      "inviteUser": {
        "HOeBzcVmwyPTL3Kdl6abfQwIbx82": {
          "email": "root@cpig.com",
          "name": "system_admin",
          "photo": ""
        }
      },
      "community": {
        "0gFNpjr7SflMxw7Y": {
          "address": "community 624 address",
          "name": "community 624"
        }
      }
    }
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
 * @apiSuccess {Object}   message.invitationId.householder               邀請加入的住戶資料
 * @apiSuccess {String}   message.invitationId.householder.householderId   住戶 ID 
 * @apiSuccess {String}   message.invitationId.householder.householderId.number 住戶門牌號碼
 * @apiSuccess {String}   message.invitationId.householder.householderId.floor  住戶樓層
 
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "lU6Flo5tMUKXAHlQ": {
      "beInvitedUser": {
        "6guc1Vmi9KfMJ5SgHkMs7sm6hE32": {
          "email": "user1@cpig.com",
          "name": "user1",
          "photo": ""
        }
      },
      "role": "COMMUNITY_ADMIN",
      "inviteUser": {
        "HOeBzcVmwyPTL3Kdl6abfQwIbx82": {
          "email": "root@cpig.com",
          "name": "system_admin",
          "photo": ""
        }
      },
      "community": {
        "0gFNpjr7SflMxw7Y": {
          "address": "community 624 address",
          "name": "community 624"
        }
      },
      "household": {
        "6XimnblO5LFRSqIJ": {
          "floor": "323",
          "number": "323"
        }
      }
    }
  }
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
 * @apiSuccess {Object}   message.invitationId.householder               邀請加入的住戶資料
 * @apiSuccess {String}   message.invitationId.householder.householderId   住戶 ID 
 * @apiSuccess {String}   message.invitationId.householder.householderId.number 住戶門牌號碼
 * @apiSuccess {String}   message.invitationId.householder.householderId.floor  住戶樓層
 
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "lU6Flo5tMUKXAHlQ": {
      "beInvitedUser": {
        "6guc1Vmi9KfMJ5SgHkMs7sm6hE32": {
          "email": "user1@cpig.com",
          "name": "user1",
          "photo": ""
        }
      },
      "role": "COMMUNITY_ADMIN",
      "inviteUser": {
        "HOeBzcVmwyPTL3Kdl6abfQwIbx82": {
          "email": "root@cpig.com",
          "name": "system_admin",
          "photo": ""
        }
      },
      "community": {
        "0gFNpjr7SflMxw7Y": {
          "address": "community 624 address",
          "name": "community 624"
        }
      },
      "household": {
        "6XimnblO5LFRSqIJ": {
          "floor": "323",
          "number": "323"
        }
      }
    }
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
 * @apiSuccess {Object}   message.invitationId.householder               邀請加入的住戶資料
 * @apiSuccess {String}   message.invitationId.householder.householderId   住戶 ID 
 * @apiSuccess {String}   message.invitationId.householder.householderId.number 住戶門牌號碼
 * @apiSuccess {String}   message.invitationId.householder.householderId.floor  住戶樓層
 
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "lU6Flo5tMUKXAHlQ": {
      "beInvitedUser": {
        "6guc1Vmi9KfMJ5SgHkMs7sm6hE32": {
          "email": "user1@cpig.com",
          "name": "user1",
          "photo": ""
        }
      },
      "role": "COMMUNITY_ADMIN",
      "inviteUser": {
        "HOeBzcVmwyPTL3Kdl6abfQwIbx82": {
          "email": "root@cpig.com",
          "name": "system_admin",
          "photo": ""
        }
      },
      "community": {
        "0gFNpjr7SflMxw7Y": {
          "address": "community 624 address",
          "name": "community 624"
        }
      },
      "household": {
        "6XimnblO5LFRSqIJ": {
          "floor": "323",
          "number": "323"
        }
      }
    }
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