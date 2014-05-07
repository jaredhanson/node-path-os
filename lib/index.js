var path = require('path')
  , os = require('os');

for (key in path) {
  if (typeof path[key] === 'function') {
    exports[key] = path[key];
  }
}


var type = os.type().toLowerCase();

if (type.indexOf('lin') === 0 || type.indexOf('sunos') === 0) {
// =============================================================================
// Linux, Solaris
// =============================================================================

// http://www.pathname.com/fhs/
// http://www.pathname.com/fhs/pub/fhs-2.3.html
// http://standards.freedesktop.org/basedir-spec/basedir-spec-latest.html

exports.homedir = function() {
  return process.env['HOME'];
}

exports.datadir = function(p) {
  var base = process.env['XDG_DATA_HOME'] || path.join(exports.homedir(), '.local', 'share');
  return p ? path.join(base, p.toLowerCase())
           : base;
}

exports.configdir = function(p) {
  var base = process.env['XDG_CONFIG_HOME'] || path.join(exports.homedir(), '.config');
  return p ? path.join(base, p.toLowerCase())
           : base;
}

exports.cachedir = function(p) {
  var base = process.env['XDG_CACHE_HOME'] || path.join(exports.homedir(), '.cache');
  return p ? path.join(base, p.toLowerCase())
           : base;
}

exports.logdir = function(p) {
  var base = '/var/log';
  return p ? path.join(base, p.toLowerCase())
           : base;
}

exports.tmpdir =
exports.tempdir = function() {
  return '/tmp';
}


} else if (type.indexOf('darwin') === 0) {
// =============================================================================
// Mac OS X
// =============================================================================

exports.homedir = function() {
  return process.env['HOME'];
}

exports.datadir = function(p) {
  return p ? path.join(exports.homedir(), 'Library', 'Application Support', p)
           : path.join(exports.homedir(), 'Library', 'Application Support');
}

exports.configdir = function(p) {
  return p ? path.join(exports.homedir(), 'Library', 'Preferences', p)
           : path.join(exports.homedir(), 'Library', 'Preferences');
}

exports.cachedir = function(p) {
  return p ? path.join(exports.homedir(), 'Library', 'Caches', p)
           : path.join(exports.homedir(), 'Library', 'Caches');
}

exports.logdir = function(p) {
  return p ? path.join(exports.homedir(), 'Library', 'Logs', p)
           : path.join(exports.homedir(), 'Library', 'Logs');
}

exports.tmpdir =
exports.tempdir = function() {
  return process.env['TMPDIR'] || '/tmp';
}


} else if (type.indexOf('win') === 0) {
// =============================================================================
// Windows
// =============================================================================

// TODO: Implement full support for Windows

exports.homedir = function() {
  return process.env['USERPROFILE'];
}

exports.tempdir = function() {
  return process.env['TEMP'];
}

exports.datadir = function(p) {
  var appData = process.env['LOCALAPPDATA'] || process.env['APPDATA']
  return appData + "\\" + p;
}


}
