var mediaScanner = require('./app/mediaScanner');
var mediaRepo = require('./app/mediaRepo');
var mm = require('musicmetadata');
var fs = require('fs');

var MEDIA_DIR = process.env.MEDIA_DIR || __dirname + '/media';
var MONGO_DSN = process.env.MONGO_DSN || 'mongodb://localhost/media';

var scanner, repo;

scanner = mediaScanner(MEDIA_DIR);
scanner.on('error', console.error);

repo = mediaRepo({mongoUrl: MONGO_DSN});
repo.close();

scanner.on('file', function(info) { 
  console.log('.'); 
  // console.log(info);
  // var parser = mm(fs.createReadStream(info.path), {duration: true});
  // parser.on('metadata', function(result) {
  //   repo.create(result, function(err, entry) {
  //     if (err) return console.error(err);
  //     console.log(entry);
  //   });
  // });
});

scanner.scan();
