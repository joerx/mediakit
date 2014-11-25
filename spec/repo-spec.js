var _ = require('lodash');
var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var MongoFixture = require('./mongoFixture');

var MediaRepo = require('./../app/mediaRepo');

describe('Media metadata repository', function() {

  var config = {mongoUrl: 'mongodb://localhost/media_test'};
  var repo = MediaRepo(config);
  var fixture = MongoFixture(config, require('./fixture'));

  beforeEach(fixture.load);

  describe('#create()', function() {

    var data = { 
      title: 'In My Body',
      album: 'Machina II: The Friends and Enemies of Modern Music',
      year: '2000',
      genre: 'Alternative rock',
      disk: { no: 0, of: 0 },
      track: { no: 22, of: 0 },
      albumArtist: [],
      artist: ['The Smashing Pumpkins'] 
    };

    it('will store the given metadata', function(done) {
      repo.create(data, function(err, entry) {
        if (err) done(err);
        expect(entry._id).to.be.defined
        expect(entry.createdAt).to.be.instanceof(Date);
        expect(entry.updatedAt).to.be.instanceof(Date);
        expect(entry.title).to.equal(data.title);
        expect(entry.year).to.equal(data.year);
        expect(entry.album).to.equal(data.album);
        expect(entry.genre).to.equal(data.genre);
        expect(entry.artist.join()).to.equal(data.artist.join());
        done();
      });
    });

    it('will not accept an entry w/o title', function(done) {
      var _data = _.omit(data, 'title');
      repo.create(_data, function(err, entry) {
        expect(err).to.be.defined;
        expect(err).not.to.be.null;
        expect(err.status).to.equal(400);
        done();
      });
    }); 
  });

  describe('#findAll()', function(done) {

    it('will find all entries', function(done) {
      repo.findAll(function(err, cur) {
        if (err) done(err);
        cur.count(function(err, cnt) {
          if (err) return done(err);
          expect(cnt).to.equal(fixture.mediaentries.length);
          done();
        });
      });
    });

  });
});
