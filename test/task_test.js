import chai from 'chai'
import chaiHttp from 'chai-http'
const expect = chai.expect
const baseUrl = "http://localhost:5000"

chai.use(chaiHttp);
describe("Task management API Unit Test", function(){

    var userId;
    var userBody = {
        userName : "BobSmith7"
    }
   
    it('create a new user', function(done) {
        chai.request(baseUrl)
        .post('/api/users/')
        .send(userBody)
        .end(function(err, res){
            expect(res).to.have.status(201);
            expect(res.body.userName).to.equal(userBody.userName)
            userId = res.body._id;
            done();
        });
    });

    var taskId;
    var taskBody = {
        title: "chai test task",
        content: "grande mocha",
        user: "603eedcd03feab1c6b44c34e"
    }

    it('creates a new task', function(done) {
        chai.request(baseUrl)
        .post('/api/tasks/')
        .send(taskBody)
        .end(function(err, res){
            expect(res).to.have.status(201);
            expect(res.body.title).to.equal(taskBody.title)
            expect(res.body.content).to.equal(taskBody.content)
            taskId = res.body._id
            done()
        })
    });


    it('update a task status', function(done) {
        chai.request(baseUrl)
        .put(`/api/tasks/${taskId}/status/`)
        .end(function (err, res) {
           
            expect(res.body.message).to.equal('task completed!');
            done();
        });
    });



    it('follows a new task', function(done) {
        chai.request(baseUrl)
        .put(`/api/users/${taskId}/follow/`)
        .send({_id: "603eedcd03feab1c6b44c34e"})
        .end(function(err, res){
            expect(res).to.have.status(201);
            expect(res.body.following).to.contain(taskId)
            done()
        })
    });

    // it('update an order', function(done) {
        
    // });
    // it('delete an order', function(done) {
        
    // });
    // it('filter orders', function(done) {
        
    // })
})