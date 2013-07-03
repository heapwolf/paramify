
var paramify = require('..')
var test = require('tape')

test('old match', function (t) {
  t.plan(1)

  var match = paramify('/intro/:greeting')
  match('intro/ohai')
  t.equals(match, match.match)
})
