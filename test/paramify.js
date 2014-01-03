var paramify = require('..')
var test = require('tape')

test('single named param', function (t) {
  t.plan(2)

  var match = paramify('/intro/ohai')
  t.assert(match('intro/:greeting'))
  t.equal(match.params.greeting, 'ohai')
})


test('multiple named params', function (t) {
  t.plan(3)

  var match = paramify('/showtimes/1337/7331')
  t.assert(match('showtimes/:start/:end'))
  t.equal(match.params.start, '1337')
  t.equal(match.params.end, '7331')
})

test('globbing matches', function (t) {
  t.plan(3)

  var match = paramify('/files/mydir/path/to/file.txt')
  t.assert(match('/files/:root/*'))
  t.equal(match.params.root, 'mydir')
  t.equal(match.params[0], 'path/to/file.txt')
})

test('regex matches', function (t) {
  t.plan(3)

  var match = paramify('/files/mydir/path/to/file.txt')
  t.assert(match(/^\/files(\/.*)?/))

  match = paramify('/files')
  t.assert(match(/^\/files(\/.*)?/))

  match = paramify('/file')
  t.assert(!match(/^\/files(\/.*)?/))
})

test('regex fail to match', function (t) {
  t.plan(2)

  var match = paramify('/profile')
  t.assert(!match(/^\/xprofile/))

  match = paramify('/@username')
  t.assert(!match(/^\/(xprofile|@#(.*?))/))
})