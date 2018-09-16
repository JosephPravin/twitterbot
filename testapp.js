const assert = require('assert');
const expect = require('chai').expect;
const request = require('request');

const validate = require('../api/util/validate');
const twitterRoute = require('../api/routes/twitterRoute');

it('Valid tweet - returns true', () => {
    assert.equal(validate.isValidTweet("Hello world"), true);
});

it('Invalid tweet - returns false', () => {
    assert.equal(validate.isValidTweet(""), false);
});


// run 'npm start' in a seperate cmd prompt for executing unit test on REST apis


it('non existing page should return 404 erro', function(done) {
    request('http://localhost:3000/' , function(error, response, body) {
        expect(response.statusCode).to.equal(404);
        done();
    });
});

it('/search without query string should return 500 error', function(done) {
    request('http://localhost:3000/tweet/search' , function(error, response, body) {
        expect(response.statusCode).to.equal(500);
        done();
    });
});

it('/search with query string : 200 SUCCESS', function(done) {
    request('http://localhost:3000/tweet/search?q=india' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});
