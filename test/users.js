let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
/*
* Test the /GET route
*/
describe('/GET user test', () => {
      it(' should get user', (done) => {
        chai.request(server)
            .get('/users?username=test')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.not.eq(0);
                
              done();
            });
      });
  });

