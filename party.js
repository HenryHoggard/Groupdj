Party = require('./models/Party');
module.exports.index = function(req, res) {
  var room = req.params.room; 
  Party.findOne({name: room}, function(err,existingparty) {
    if (existingparty) {
     var songlist = existingparty.songlist;
    } else { 
  var party = new Party({
    name: room,
  });
party.save(function(err) {
   console.log(err);
 });
}
  res.render('party', {
    room: room,
    songlist: songlist,
});
});
};

module.exports.addSong = function(song, room) {
  console.log(song);
  Party.findOneAndUpdate(
    {name: room},
    {$push: {songlist: song}},
    {safe: true},
    function(err, model) {
        console.log(err);
    }
);
 
};

module.exports.deleteSong = function(song, room) {
  if (song == "") { 
   song = null;
  }
  Party.findOneAndUpdate(
    {name: room},
    {$pull: {songlist: song}},
    {safe: true},
    function(err) {
      console.log(err);
    }
  );


};
