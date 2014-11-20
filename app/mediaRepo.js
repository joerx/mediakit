var _ = require('lodash');
var mongoose = require('mongoose');
var EventEmitter = require('events').EventEmitter;
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports = function(config) {

  var repo = Object.create(null);
  mongoose.connect(config.mongoDsn)

  var MediaEntrySchema = new Schema({
    title: String,
    artist: [String],
    albumArtist: [String],
    album: String,
    year: String,
    track: { no: Number, of: Number },
    disk: { no: Number, of: Number },
    genre: String,
    createdAt: Date,
    updatedAt: Date
  });

  var MediaEntry = mongoose.model('MediaEntry', MediaEntrySchema);

  function _bail(err) {
    repo.emit('error', err);
  }

  repo.create = function create(data, done) {
    _.extend(data, {
      createdAt: new Date(),
      updatedAt: new Date()
    });
    var entry = new MediaEntry(data);
    entry.save(function(err, entry) {
      if (err) return done(err);
      done(null, entry);
    });
  }

  return repo;
}
