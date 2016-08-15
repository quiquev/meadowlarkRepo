//Script de PhantomJS
var webpage = require('webpage');
var page = webpage.create();

page.viewportSize = {width: 1920, height: 1080};
page.open('http://www.google.com', function(status){
    page.render('googlePrint.png', {format: 'png', quality: '100'});

    phantom.exit();
});
