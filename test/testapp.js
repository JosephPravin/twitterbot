const assert = require('assert');
const validate = require('../api/util/validate');

it('Valid tweet - returns true', () => {
    assert.equal(validate.isValidTweet("Hello world"), true);
});

it('Invalid tweet - returns false', () => {
    assert.equal(validate.isValidTweet(""), false);
});

