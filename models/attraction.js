var mongoose = require('mongoose');

var attractionSquema = mongoose.Schema({
    name: String,
    description: String,
    location: {lat: Number, lng: Number},
    history: {
        event: String,
        notes: String,
        email: String,
        date: Date
    },
    updateId: String,
    approved: Boolean
});

var Attraction = mongoose.model('Attraction', attractionSquema);

module.exports = Attraction;
