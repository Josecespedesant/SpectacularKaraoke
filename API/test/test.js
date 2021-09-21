let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:3000';

describe('Failure Attempt POST Create New Song', () => {
    it('Should not add a new song', (done) =>{
        chai.request(url)
        .post('/songs/')
        .send({artist:'Nirvana',album:'Nevermind',lyrics:'asdasd',name:'Smells Like Teen Spirit'})
        .end(function(err,res){
            console.log(res.body)
            expect(res).to.have.status(404);
            done();
        });
    } );
});

describe('Success on GET all items from bucket', () => {
    it('Should get all the items from bucket', (done) =>{
        chai.request(url)
        .get('/songs')
        .end(function(err,res){
            console.log(res.body)
            expect(res).to.have.status(200);
            done();
        });
    } );
});

describe('Success on GET all songs from Tupac', () => {
    it('Should get all the items from Tupac', (done) =>{
        chai.request(url)
        .get('/songs/by/')
        .query({artist:'Tupac'})
        .end(function(err,res){
            console.log(res.body)
            expect(res).to.have.status(200);
            done();
        });
    } );
});

describe('Success on GET all songs with asd in its lyrics', () => {
    it('Should get all songs with asd in its lyrics', (done) =>{
        chai.request(url)
        .get('/songs/byLyrics')
        .query({lyrics:'asd'})
        .end(function(err,res){
            console.log(res.body)
            expect(res).to.have.status(200);
            done();
        });
    } );
});

describe('Success on DELETE Sowk from Tupac', () => {
    it('Should delete Sowk from Tupac', (done) =>{
        chai.request(url)
        .del('/songs/')
        .query({artist:'tupac',name:'sowk'})
        .end(function(err,res){
            console.log(res.body)
            expect(res).to.have.status(500);
            done();
        });
    } );
});

