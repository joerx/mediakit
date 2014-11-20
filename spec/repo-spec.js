var mediaRepo = require('./../app/mediaRepo');
var expect = require('chai').expect;
var ObjectId = require('mongoose').Schema.ObjectId;

describe('Media metadata repository', function() {

  var repo = new mediaRepo({mongoDsn: 'mongodb://localhost/media_test'});

  describe('#create()', function() {

    it('will store the given metadata', function(done) {
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
  });
});
