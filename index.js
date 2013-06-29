
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
  paramify.url = url
  return paramify
}

module.exports = paramify

paramify.match = function(vurl) {

  var reg = regify(vurl)
  var matches = paramify.url.match(reg.exp)

  if (!matches) {
    return false
  }

  paramify.match.params = {}

  for (var i = 0; i < reg.keys.length; i++) {
    paramify.match.params[reg.keys[i].name] = matches[i + 1]
  }

  return true
}
