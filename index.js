var mediaScanner = require('./app/mediaScanner');

var MEDIA_DIR = process.env.MEDIA_DIR || __dirname + '/media';

scanner = mediaScanner(MEDIA_DIR);
scanner.on('error', function(err) { console.error(err) });
scanner.on('file', function(info) { console.log(info); });

scanner.scan();
