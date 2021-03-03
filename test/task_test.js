import chai from 'chai'
import chaiHttp from 'chai-http'
const expect = chai.expect
const baseUrl = "http://localhost:5000"

chai.use(chaiHttp);
describe("Task management API Unit Test", function(){

    var userId;
    var userBody = {
        userName : "BobSmith12"
    }
   
    it('create a new user', function(done) {
        chai.request(baseUrl)
        .post('/api/users/')
        .send(userBody)
        .end(function(err, res){
            expect(res).to.have.status(201);
            expect(res.body.userName).to.equal(userBody.userName);
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
        .send({_id: userId})
        .end(function(err, res){
            expect(res).to.have.status(201);
            done()
        })
    });

    it('gets user following list', function(done) {
        chai.request(baseUrl)
        .get(`/api/users/${userId}/followlist/`)
        .end(function(err, res){
            expect(res).to.have.status(201);  
            done()
        })
    });

    it('gets user completed tasks', function(done) {
        chai.request(baseUrl)
        .get(`/api/users/${userId}/completed/`)
        .end(function(err, res){
            expect(res).to.have.status(201);
            res.body.forEach((task) => {
                expect(task.complete).to.be.equal(true)
            })
            done()
        })
    });

    it('gets user incomplete tasks', function(done) {
        chai.request(baseUrl)
        .get(`/api/users/${userId}/incomplete/`)
        .end(function(err, res){
            expect(res).to.have.status(201);
            res.body.forEach((task) => {
                expect(task.complete).to.be.equal(false)
            })
            done()
        })
    });

    it('deletes a user', function(done) {
        chai.request(baseUrl)
        .delete(`/api/users/${userId}/deleteuser/`)
        .end(function(err, res){
            expect(res).to.have.status(201);
            expect(res.body.message).to.equal('user deleted');
            done()
        })
    });
})