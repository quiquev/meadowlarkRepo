var mongoose = require('mongoose');

var vacationInSeasonListenerSchema = mongoose.Schema({
    email: String,
    skus: [String]
});

vacationInSeasonListenerSchema.methods.skuListed = function(sku){
    return this.skus.indexOf(sku) >= 0;
};

var VacationInSeasonListener = mongoose.model('VacationInSeasonListener', vacationInSeasonListenerSchema);

module.exports = VacationInSeasonListener;
