var Attraction = require('../models/attraction.js');
var mongoose = require('mongoose');
mongoose.promise = global.Promise;

module.exports = function (rest) {
    rest.get('/attractions', function (req, content, cb){
        Attraction.find({ approved: true }, function (err, attractions){
            if (err) return cb({ error: 'Internal error.' });
            cb(null, attractions.map(function (a){
                return {
                    name: a.name,
                    id: a._id,
                    description: a.description,
                    location: a.location
                }
            }));
        });
    });

    rest.post('/attraction', function(req, content, cb){
        //console.log('API Post Attraction REQ: ', req.body);
        var a = new Attraction({
            name: req.body.name,
            description: req.body.description,
            location: {lat: req.body.lat, lng: req.body.lng},
            history: {
                event: 'created',
                email: req.body.email,
                date: new Date()
            },
            approved: false
        });
        //console.log('Attraction to be saved : ', a);
        var promise = a.save();

        promise.then(function (){
            cb(null, { id: a._id });
        }).catch(function (err){
            //console.log("Error updating Attraction : ", err);
            return cb( {error: 'Error ocurred: database error.'} );
        });
    });

    rest.get('/attraction/:id', function (req, content, cb){
        Attraction.findById(req.params.id, function (err, a){
            if (err) return cb( {error: 'Error ocurred: database error.'} );

            cb(null,
                {
                name: a.name,
                id: a._id,
                description: a.description,
                location: a.location
                }
            );
        });
    });
};
