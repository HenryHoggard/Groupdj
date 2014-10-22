var mongoose = require('mongoose/');


var PartySchema = new mongoose.Schema({
  name: {type: String, unique: true},
  songlist: Array,
  listeners: String,
});

var Party = mongoose.model('Party',PartySchema);

module.exports = mongoose.model('Party', PartySchema);

//var Project = mongoose.model('Project');

