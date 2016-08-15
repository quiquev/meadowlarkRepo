/*
var assert = require('chai').assert,
    path = require('path'),
    webPage = require('webpage');

var page;

suite('Cross-Page Tests', function(){
    setup(function(){
        page = webPage.create();
    });
    test('requesting a group rate quote from the hood river tour page should populate the referrer field', function(){
        var referrer = 'http://localhost:3000/tours/hood-river';
        page.open(referrer, function(){
            page.render('image.png');
            assert(true);
            phantom.exit();
            /*browser.clickLink('.requestGroupRate', function(){
                assert(browser.field('referrer').value === referrer);
                done();
            });
        });
    });
});
*/
