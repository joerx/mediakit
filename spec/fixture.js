var ObjectID = require('mongodb').ObjectID;

module.exports = {
  mediaentries: [
    {
      _id: ObjectID(),
      title: 'In My Body',
      album: 'Machina II: The Friends and Enemies of Modern Music',
      year: '2000',
      genre: 'Alternative rock',
      disk: { no: 0, of: 0 },
      track: { no: 22, of: 0 },
      albumArtist: [],
      artist: ['The Smashing Pumpkins']
    },
    {
      _id: ObjectID(),
      title: 'In My Body',
      album: 'Machina II: The Friends and Enemies of Modern Music',
      year: '2000',
      genre: 'Alternative rock',
      disk: { no: 0, of: 0 },
      track: { no: 22, of: 0 },
      albumArtist: [],
      artist: ['The Smashing Pumpkins']
    },
  ]
}
