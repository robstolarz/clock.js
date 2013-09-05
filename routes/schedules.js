var ObjectID = require('mongodb').ObjectID;

function Schedules() {}

Schedules.prototype.setModules = function(modules) {
  this.Admin = modules.Admin;
  this.Themes = modules.Themes;
  this.Schedules = modules.Schedules;
  this.Marquee = modules.Marquee;
  this.Notices = modules.Notices;
  this.Periods = modules.Periods;
};

Schedules.prototype.landing = function(req, res) {
  var data = this.Admin.getViewData(req);

  this.Schedules.getAll(function(err, schedules) {
    data.schedules = schedules;
    res.render('admin/pages/schedules', data);
  });
};

Schedules.prototype.activate = function(req, res) {
  this.Schedules.activate(new ObjectID(req.params.objectID), function(err) {
    if (err) throw err;
    res.redirect('/admin/schedules');
  });
};

module.exports = new Schedules();