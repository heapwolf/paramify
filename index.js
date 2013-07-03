
var pathToRegexp = require('path-to-regexp')
var cache = {}

function regify(vurl) {

  if (cache[vurl]) {
    return cache[vurl]
  }

  if (vurl.charAt(0) != '/') {
    vurl = '/' + vurl
  }

  var reg = cache[vurl] = {}
  reg.keys = []
  reg.exp = pathToRegexp(vurl, reg.keys)

  return reg
}

function paramify(url) {
  try { url = decodeURI(url) } catch($) {}

  function match (vurl) {

    var reg = regify(vurl)
    var matches = url.match(reg.exp)

    if (!matches) {
      return false
    }

    var params = {}

    for (var i = 0; i < reg.keys.length; i++) {
      params[reg.keys[i].name] = matches[i + 1]
    }

    match.params = params

    return true
  }

  match.match = match
  return match
}

module.exports = paramify

