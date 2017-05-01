const chai = require('chai');
const server = require('../../server');
const request = require("supertest-as-promised");

/*
  URL : /communities/
*/

exports.post_Communities = (uid, data) => {  
  return request(server)
    .post('/communities/')
    .set('Authorization', uid)
    .set('Accept', 'application/json')
    .send(data)
    .then(res => { return res });
}

exports.read_Communities = (uid, all) => {
  return request(server)
    .get('/communities/')
    .set('Authorization', uid)
    .query({all:all})
    .set('Accept', 'application/json')
    .then(res => { return res });
}

exports.put_Communities = (uid) => {  
  return request(server)
    .put('/communities/')
    .set('Authorization', uid)
    .set('Accept', 'application/json')
    .then(res => { return res });
}

exports.delete_Communities = (uid) => {  
  return request(server)
    .delete('/communities/')
    .set('Authorization', uid)
    .set('Accept', 'application/json')
    .then(res => { return res });
}

/*
  URL : /communities/:communityId/
*/ 

exports.post_aCommunity = (uid, id) => {
  return request(server)
    .post(`/communities/${id}/`)
    .set('Authorization', uid)
    .set('Accept', 'application/json')
    .then(res => { return res });
}

exports.get_aCommunity = (uid, id) => {
  return request(server)
    .get(`/communities/${id}/`)
    .set('Authorization', uid)
    .set('Accept', 'application/json')
    .then(res => { return res });
}

exports.put_aCommunity = (uid, id, data) => {
  return request(server)
    .put(`/communities/${id}/`)
    .set('Authorization', uid)
    .set('Accept', 'application/json')
    .send(data)
    .then(res => { return res });
}

exports.delete_aCommunity = (uid, id) => {
  return request(server)
    .delete(`/communities/${id}/`)
    .set('Authorization', uid)
    .set('Accept', 'application/json')
    .then(res => { return res });
}
