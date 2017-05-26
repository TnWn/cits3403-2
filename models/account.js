var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var validators = require('mongoose-validators');

var Account = new Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    username: {type: String, unique : true, required: true},
    email: {type: String, unique : true, required: true, validate: validators.isEmail()},
    password: String,
    energy: { type: Number, required: true},
    confidence: { type: Number, required: true},
    focus: { type: Number, required: true},
    independence: {type: Number, required: true}
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
