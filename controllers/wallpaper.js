var express = require('express');
var mongoose = require('mongoose');
var Theme = mongoose.model('Theme');

var router = express.Router();

router.get('/active', function(req, res, next) {
  Theme.getWallpaperStreamOfActive(function(err, wallpaperStream) {
    wallpaperStream.pipe(res);
  });
});

router.param('wallpaper', function(req, res, next, id) {
  Theme.createWallpaperStream(id, function(err, wallpaperStream) {
    if (err) return next(err);

    req.wallpaperStream = wallpaperStream;
    next();
  });
});

router.get('/:wallpaper', function(req, res, next) {
  req.wallpaperStream.pipe(res);
});

module.exports = router;