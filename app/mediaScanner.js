var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

/**
 * Creates a media scanner that runs through the specified directory looking for media files.
 * Scanner extends EventEmitter and will emit a 'file' event for every media file found.
 */
module.exports = function mediaScanner(baseDir) {

  var scanner = {};
  var emitter = new EventEmitter();

  // Scan given directory for files
  function scandir(path) {
    fs.readdir(path, function(err, files) {
      if (err) {
        return emitter.emit('error', err);
      }
      files.forEach(function(file) {
        var fullpath = path + '/' + file;
        checkfile(fullpath);
      });
    });  
  }

  // Check given file - directories are recursively scanned, files are reported, links are skipped
  function checkfile(_path) {
    fs.lstat(_path, function(err, stats) {
      if (err) {
        return emitter.emit('error', err);
      }
      if (stats.isDirectory()) {
        console.log('[ENTER]', _path);
        return scandir(_path);
      }
      if (stats.isSymbolicLink()) {
        return; // don't follow
      }
      if (stats.isFile() && /mp3$/.test(_path)) {
        console.log('[CHECK]', _path);
        var info = _(stats)
          .pick('atime', 'mtime', 'ctime', 'size')
          .extend({
            path: _path,
            file: path.basename(_path)
          })
          .value();
        return emitter.emit('file', info);
      }
      console.log('[SKIP]', _path);
    });
  }

  scanner.scan = function () {
    scandir(baseDir);
    console.log('[DONE]');
  }
  
  scanner.__proto__ = emitter;
  return scanner;
}
