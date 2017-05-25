var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Dog = new Schema({
    name: String,
    breed: String,
    gender: Boolean, // (1) male, (0) female
    age: Number,
    size: String,
    vaccination: Boolean,
    desex: Boolean,
    deworm: Boolean,
    heartworm: Boolean,
    location: String,
    Phone: String,
    email: String,
    password: String,
    energy: Number,
    confidence: Number,
    focus: Number,
    independence: Number,
});

module.exports = mongoose.model('Dog', Dog);
