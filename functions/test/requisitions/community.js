const chai = require('chai');
const server = require('../../server');
const expect = chai.expect;
// const request = require('supertest');
const request = require("supertest-as-promised");

exports.systemAdminUid = "HOeBzcVmwyPTL3Kdl6abfQwIbx82";
exports.user1Uid = "6guc1Vmi9KfMJ5SgHkMs7sm6hE32";
exports.user2Uid = "BcGGCNDFYCVOnS7dIqKMZlDMC212";

/*
    URL : /requisitions/community/
*/

exports.post_CommunityRequisition = (uid, data) => {  
  return request(server)
    .post('/requisitions/community/')
    .set('Authorization', uid)
    .set('Accept', 'application/json')
    .send(data)
    .then(res => { return res });
}

exports.read_CommunityRequisitions = (uid, all) => {
  return request(server)
    .get('/requisitions/community/')
    .set('Authorization', uid)
    .query({all:all})
    .set('Accept', 'application/json')
    .then(res => { return res });
}

exports.put_CommunityRequisitions = (uid) => {  
  return request(server)
    .put('/requisitions/community/')
    .set('Authorization', uid)
    .set('Accept', 'application/json')
    .then(res => { return res });
}

exports.delete_CommunityRequisitions = (uid) => {  
  return request(server)
    .delete('/requisitions/community/')
    .set('Authorization', uid)
    .set('Accept', 'application/json')
    .then(res => { return res });
}

/*
    URL : /requisitions/community/:communityReqId
*/ 

exports.post_aCommunityRequisition = (uid, reqId) => {
  return request(server)
    .post(`/requisitions/community/${reqId}/`)
    .set('Authorization', uid)
    .set('Accept', 'application/json')
    .then(res => { return res });
}

exports.get_aCommunityRequisition = (uid, reqId) => {
  return request(server)
    .get(`/requisitions/community/${reqId}/`)
    .set('Authorization', uid)
    .set('Accept', 'application/json')
    .then(res => { return res });
}

exports.put_aCommunityRequisition = (uid, reqId, ModifiedData) => {
  return request(server)
    .put(`/requisitions/community/${reqId}/`)
    .set('Authorization', uid)
    .set('Accept', 'application/json')
    .send(ModifiedData)
    .then(res => { return res });
}

exports.delete_aCommunityRequisition = (uid, reqId) => {
  return request(server)
    .delete(`/requisitions/community/${reqId}/`)
    .set('Authorization', uid)
    .set('Accept', 'application/json')
    .then(res => { return res });
}

/*
    URL : /requisitions/community/:communityReqId/verify
*/

exports.post_verifyCommunityRequisition = (uid, reqId) => {
  return request(server)
    .post(`/requisitions/community/${reqId}/verify/`)
    .set('Authorization', uid)
    .set('Accept', 'application/json')
    .then(res => { return res });
}

exports.get_verifyCommunityRequisition = (uid, reqId) => {
  return request(server)
    .get(`/requisitions/community/${reqId}/verify/`)
    .set('Authorization', uid)
    .set('Accept', 'application/json')
    .then(res => { return res });
}

exports.put_verifyCommunityRequisition = (uid, reqId) => {
  return request(server)
    .put(`/requisitions/community/${reqId}/verify/`)
    .set('Authorization', uid)
    .set('Accept', 'application/json')
    .then(res => { return res });
}

exports.delete_verifyCommunityRequisition = (uid, reqId) => {
  return request(server)
    .delete(`/requisitions/community/${reqId}/verify/`)
    .set('Authorization', uid)
    .set('Accept', 'application/json')
    .then(res => { return res });
}
