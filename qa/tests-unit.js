var fortune = require('../lib/fortune.js');
var expect = require('chai').expect;

suite('Fortune cookie tests', function(){
    test('getFortune() should return a fortune (string)', function(){
        expect(typeof fortune.getFortune() === 'string').to.equal(true);
    });
});
