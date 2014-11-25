var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var MongoClient = require('mongodb').MongoClient;

module.exports = function(config) {

  var db;
  var repo = Object.create({
    create: create,
    findAll: findAll
  });

  /**
   * Create a media entry in the repository
   */
  function create(data, done) {
    var err = _validate(data);
    if (err) return done(err);

    data.createdAt = new Date();
    data.updatedAt = new Date();

    _connect(function(err, db) {
      if (err) return done(err);
      db.collection('mediaentries').insert(data, function(err, results) {
        if (err) return done(err);
        done(null, results[0]);
      });
    });
  };

  /**
   * Find all media entries in the repository
   */
  function findAll(done) {
    _connect(function(err, db) {
      if (err) return done(err);
      db.collection('mediaentries').find({}, done);
    });
  }

  function _validate(entry) {
    if (!entry.title) {
      var err = Error();
      err.status = 400;
      return err;
    }
  }

  // TODO: repo('mediaentries').insert() <== built-in lazy initialization

  var db;
  function _connect(done) {
    if (!db) {
      MongoClient.connect(config.mongoUrl, function(err, _db) {
        if (err) return done(err);
        db = _db;
        done(null, db);
      });
    } else {
      done(null, db);
    }
  }

  return repo;
}
