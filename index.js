
var pathToRegexp = require('path-to-regexp')
var cache = {}

function regify(vurl) {
  var re = vurl instanceof RegExp
  var key = re ? '$$' + vurl.source : vurl

  if (cache[key]) {
    return cache[key]
  }

  if (!re && vurl.charAt(0) != '/') {
    vurl = '/' + vurl
  }

  var reg = cache[key] = {}
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

    var params = []

    for (var i = 1; i < matches.length; i++) {
      var key = reg.keys[i - 1]
      if (key) {
        params[key.name] = matches[i]
      } else {
        params.push(matches[i])
      }
    }

    match.params = params

    return true
  }

  match.match = match
  return match
}

module.exports = paramify

