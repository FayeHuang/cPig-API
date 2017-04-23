const express = require('express');
const router = express.Router();
const http = require("../libs/http");


// ===================== /householder =====================

var url = '/householder';

router.route(url)
.post((req, res) => {
  // 新增住戶申請單
  const communityId = req.body.communityId;
  const number = req.body.number;
  const floor = req.body.floor;
  res.send(`[POST] /householder\ncommunityId=${communityId}, number=${number}, floor=${floor}`);
})
.get((req, res) => {
  // 取得所有住戶申請單
  res.send('[GET] /householder');
})
.all((req, res) => http.methodNotAllowed(req, res));


// ===================== /householder/:householderReqId =====================


router.route(url)
.get((req, res) => {
  // 取得指定住戶申請單資料
  res.send(`[GET] /householder/${req.params.householderReqId}`);
})
.delete((req, res) => {
  // 刪除指定住戶申請單
  res.send(`[DELETE] /householder/${req.params.householderReqId}`);
})
.all((req, res) => http.methodNotAllowed(req, res));


// ===================== /householder/:householderReqId/verify =====================

router.route(url)
.post((req, res) => {
  // 指定住戶申請單審核通過
  res.send(`[POST] /householder/${req.params.householderReqId}/verify`);
})
.all((req, res) => http.methodNotAllowed(req, res));


module.exports = router;