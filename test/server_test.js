import chai from 'chai'
import chaiHttp from 'chai-http'

const expect = chai.expect
const baseUrl = "http://localhost:5000"
chai.use(chaiHttp);

describe("Server Test", function(){
it('server is live', function(done) {
        chai.request(baseUrl)
        .get('/')
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
    })
})