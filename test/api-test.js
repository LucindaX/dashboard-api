const should = require('should');
const assert = require('assert');
const request  = require('supertest');
const app = require('../app');

describe('GET topActiveUsers', () => {
  it('should return an array', (done) => {
    request(app)
      .get('/topActiveUsers')
      .expect(200)
      .end((err, res) => {
        res.body.should.be.instanceOf(Array);
        done();
      })
  });
});

describe('GET users', () => {
  it('should return an object', (done) => {
    request(app)
      .get('/users')
      .send({id: 1})
      .expect(200, done)
  })
})
