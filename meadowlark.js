var express = require('express');
var app = express();
var fortune = require("./lib/fortune.js");
var weather = require('./lib/getWeatherData.js');
var formidable = require('formidable');
var jqupload = require('jquery-file-upload-middleware');
var credentials = require('./lib/credentials.js');
//var emailService = require('./lib/email.js')(credentials);

// set up handlebars view engine
var handlebars = require('express3-handlebars').create({
    defaultLayout:'main',
    helpers: {
        section: function(name, options){
            if(!this._sections)
                this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);
app.use(require('body-parser')());
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
}));

app.use(function(req, res, next){
  res.locals.showTests = app.get('env') !== 'production' && req.query.test == '1';
  next();
});

app.use(function(req, res, next){
    res.locals.partials = res.locals.partials || {};
    res.locals.partials.weather = weather.getWeatherData();
    next();
});

app.use(function(req, res, next){
    res.locals.flash = req.session.flash;
    delete req.session.flash;
    next();
});

app.use('/upload', function(req, res, next){
    var now = Date.now();
    jqupload.fileHandler({
        uploadDir: function (){
            return __dirname + '/public/uploads/' + now;
        },
        uploadUrl: function(){
            return '/uploads/' + now;
        }
    })(req, res, next);
});

app.get('/', function(req, res){
  res.render('home');
});

app.get('/about', function(req, res){
    res.render('about', {
        fortune : fortune.getFortune(),
        pageTestScript : "/qa/tests-about.js"
    });
});

app.get('/tours/hood-river', function(req, res){
    res.render('tours/hood-river');
});

app.get('/tours/request-page-group', function(res, req){
    res.render('tours/request-page-group');
});

app.get('/jquery-test', function(req, res){
    res.render('jquery-test');
});

app.get('/nursery-rhyme', function(req, res){
    res.render('nursery-rhyme');
});

app.get('/thank-you', function(req, res){
    res.render('thank-you');
});

app.get('/data/nursery-rhyme', function(req, res){
    res.json({
        animal: 'squirrel',
        bodyPart: 'tail',
        adjective: 'bushy',
        noun: 'heck'
    });
});

app.get('/newsletter', function(req, res){
    res.render('newsletter', {csrf: 'CSRF token should go here!'});
});

app.post('/process', function(req, res){
    if(req.xhr || req.accepts('json, html') === 'json'){
        res.send({success: true});
    }else{
        res.redirect(303, '/thank-you');
    }
});

app.get('/contest/vacation-photo', function(req, res){
    var now = new Date();
    res.render('contest/vacation-photo', { year: now.getFullYear(), month: now.getMonth() });
});

app.post('/contest/vacation-photo/:year/:month', function(req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        if(err) return res.redirect(303, '/error');
        console.log('Received fields:\n', fields);
        console.log('Received files:\n', files);
        res.redirect(303, '/thank-you');
    });
});

// for now, we're mocking NewsletterSignup:
function NewsletterSignup(){
}
NewsletterSignup.prototype.save = function(cb){
	cb();
};

var VALID_EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

app.post('/newsletter', function(req, res){
    var name = req.body.name || '', email = req.body.email || '';
    // input validation
    if(!VALID_EMAIL_REGEX.test(email)) {
        if(req.xhr) return res.json({ error: 'Invalid name email address.' });
        req.session.flash = {
            type: 'danger',
            intro: 'Validation error!',
            message: 'The email address you entered was not valid.',
        };
        return res.redirect(303, '/newsletter/archive');
    }
    new NewsletterSignup({ name: name, email: email }).save(function(err){
        if(err) {
            if(req.xhr) return res.json({ error: 'Database error.' });
            req.session.flash = {
                type: 'danger',
                intro: 'Database error!',
                message: 'There was a database error; please try again later.'
            };
            return res.redirect(303, '/newsletter/archive');
        }
        if(req.xhr) return res.json({ success: true });
        req.session.flash = {
            type: 'success',
            intro: 'Thank you!',
            message: 'You have now been signed up for the newsletter.',
        };
        return res.redirect(303, '/newsletter/archive');
    });
});

app.get('/newsletter/archive', function(req, res){
	res.render('newsletter/archive');
});
/*
app.get('/email', function(req, res){
    res.render('home');
});
*/
// custom 404 page
app.use(function(req, res){
  res.status(404);
  res.render('404');
});

// custom 500 page
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});


app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' );
});
