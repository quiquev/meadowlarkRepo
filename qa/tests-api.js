var assert = require('chai').assert,
    http = require('http'),
    rest = require('restler');

suite('API Tests', function(){
    var attraction = {
        lat: 45.123456,
        lng: -123.098765,
        name: 'Titis Museum',
        description: 'Founded in blah blah blah...',
        email: 'lala@gmail.com'
    };

    var base = 'http://localhost:3000';

    test('Should be able to add an attraction.', function(done){
        rest.post(base + '/api/attraction', {data: attraction}).on('success', function (data){
            assert.match(data.id, /\w/, 'ID must be set.');
            done();
        });
    });

    test('Should be able to return an attraction.', function (done){
        rest.post(base + '/api/attraction', {data: attraction}).on('success', function (data){
            rest.get(base + '/api/attraction/' + data.id).on('success', function (data){
                assert(attraction.name === data.name);
                assert(attraction.description === data.description);
                done();
            });
        });
    });
});
