// const chai = require('chai');
const server = require('../../server');
// const request = require('supertest');
const request = require("supertest-as-promised");

/*
    URL : /requisitions/householder/
*/

exports.post_HouseholderRequisition = (uid, data) => {  
  return request(server)
    .post('/requisitions/householder/')
    .set('Authorization', uid)
    .set('Accept', 'application/json')
    .send(data)
    .then(res => { return res });
}

exports.read_HouseholderRequisitions = (uid, all) => {
  return request(server)
    .get('/requisitions/householder/')
    .set('Authorization', uid)
    .query({all:all})
    .set('Accept', 'application/json')
    .then(res => { return res });
}

exports.put_HouseholderRequisitions = (uid) => {  
  return request(server)
    .put('/requisitions/householder/')
    .set('Authorization', uid)
    .set('Accept', 'application/json')
    .then(res => { return res });
}

exports.delete_HouseholderRequisitions = (uid) => {  
  return request(server)
    .delete('/requisitions/householder/')
    .set('Authorization', uid)
    .set('Accept', 'application/json')
    .then(res => { return res });
}

/*
    URL : /requisitions/householder/:householderReqId
*/ 

exports.post_aHouseholderRequisition = (uid, reqId) => {
  return request(server)
    .post(`/requisitions/householder/${reqId}/`)
    .set('Authorization', uid)
    .set('Accept', 'application/json')
    .then(res => { return res });
}

exports.get_aHouseholderRequisition = (uid, reqId) => {
  return request(server)
    .get(`/requisitions/householder/${reqId}/`)
    .set('Authorization', uid)
    .set('Accept', 'application/json')
    .then(res => { return res });
}

exports.put_aHouseholderRequisition = (uid, reqId, ModifiedData) => {
  return request(server)
    .put(`/requisitions/householder/${reqId}/`)
    .set('Authorization', uid)
    .set('Accept', 'application/json')
    .send(ModifiedData)
    .then(res => { return res });
}

exports.delete_aHouseholderRequisition = (uid, reqId) => {
  return request(server)
    .delete(`/requisitions/householder/${reqId}/`)
    .set('Authorization', uid)
    .set('Accept', 'application/json')
    .then(res => { return res });
}

/*
    URL : /requisitions/householder/:householderReqId/verify
*/

exports.post_verifyHouseholderRequisition = (uid, reqId) => {
  return request(server)
    .post(`/requisitions/householder/${reqId}/verify/`)
    .set('Authorization', uid)
    .set('Accept', 'application/json')
    .then(res => { return res });
}

exports.get_verifyHouseholderRequisition = (uid, reqId) => {
  return request(server)
    .get(`/requisitions/householder/${reqId}/verify/`)
    .set('Authorization', uid)
    .set('Accept', 'application/json')
    .then(res => { return res });
}

exports.put_verifyHouseholderRequisition = (uid, reqId) => {
  return request(server)
    .put(`/requisitions/householder/${reqId}/verify/`)
    .set('Authorization', uid)
    .set('Accept', 'application/json')
    .then(res => { return res });
}

exports.delete_verifyHouseholderRequisition = (uid, reqId) => {
  return request(server)
    .delete(`/requisitions/householder/${reqId}/verify/`)
    .set('Authorization', uid)
    .set('Accept', 'application/json')
    .then(res => { return res });
}
