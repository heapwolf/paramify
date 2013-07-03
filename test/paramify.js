var paramify = require('..')
var test = require('tape')

test('paramify', function (t) {
  t.plan(4)
  var match

  match = paramify('/intro/ohai')
  t.assert(match('intro/:greeting'))
  t.deepEquals(match.params, { greeting: 'ohai' })

  match = paramify('/showtimes/1337/7331')
  t.assert(match('showtimes/:start/:end'))
  t.deepEquals(match.params, { start: '1337', end: '7331' })
})
