var MongoClient = require('mongodb').MongoClient;

module.exports = function mongoFixture(config, data) {

  var obj = Object.create({load: load});

  Object.keys(data).forEach(function(key) {
    obj.__defineGetter__(key, function() {return data[key]});
  });

  function load(done) {
    MongoClient.connect(config.mongoUrl, function(err, db) {
      if (err) return done(err);
      Object.keys(data).forEach(function(key) {
        var coll = db.collection(key);
        coll.remove(coll.insert.bind(coll, data[key], done));
      });
    });
  }

  return obj;
}
