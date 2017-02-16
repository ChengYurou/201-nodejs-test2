require('should');
const request = require('supertest');
const app = require('../../app');
const constant = require('../../config/constant');

describe('CartController', ()=> {
  it('GET /carts should return all carts', (done) => {
    request(app)
        .get('/carts')
        .expect(constant.httpCode.OK)
        .expect((res) => {
          res.body.should.eql({
            items: [{
              _id: '587f0f2586653d19297d40c6',
              userId: '1',
              __v: 0,
              items: [{uri: 'items/587f0f2586653d19297d40c2', count: 1}]
            }],
            totalCount: 1
          });
        })
        .end(done)
  });

  it('GET /carts should return one cart', (done) => {
    request(app)
        .get('/carts/587f0f2586653d19297d40c6')
        .expect(constant.httpCode.OK)
        .expect((res) => {
          res.body.should.eql({
            _id: '587f0f2586653d19297d40c6',
            userId: '1',
            __v: 0,
            items: [{uri: 'items/587f0f2586653d19297d40c2', count: 1}]
          })
        })
        .end(done)
  })
  it('POST /carts create cart and return uri', (done) => {
    const cart = {
      userId: '666',
      items: [{item: '587f0f2586653d19297d40c2', count: 1}]
    };
    request(app)
        .post('/carts')
        .send(cart)
        .expect(constant.httpCode.CREATED)
        .expect((res) => {
          const result = /^carts\/(.*)$/.test(res.body.uri);
          result.should.eql(true);
        })
        .end(done)
  })
  it('PUT /carts should update cart', (done) => {
    const cart = {
      userId: '666',
      items: [{item: '587f0f2586653d19297d40c2', count: 1}]
    };
    request(app)
        .put('/carts/587f0f2586653d19297d40c6')
        .send(cart)
        .expect(constant.httpCode.NO_CONTENT)
        .end(done)
  })
  it('DELETE /carts should delete cart', (done) => {
    request(app)
        .delete('/carts/587f0f2586653d19297d40c6')
        .expect(constant.httpCode.NO_CONTENT)
        .end(done)
  })
})