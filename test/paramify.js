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
  t.plan(4)

  var match = paramify('/files/mydir/path/to/file.txt')
  t.assert(match('/files/:root/*'))
  t.equal(match.params.root, 'mydir')
  t.equal(match.params[0], '/files/mydir/path/to/file.txt')
  t.equal(match.params[1], 'path/to/file.txt')
})
