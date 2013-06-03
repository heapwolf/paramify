
var cache = {}

function regify(vurl) {

  if (cache[vurl]) {
    return cache[vurl]
  }

  var matches
  var capture
  var length
  var i = 0
  var last = 0
  var out = ''
  var key = vurl

  cache[key] = { captures: [] }

  while (matches = vurl.substr(last).match(/[^\w\d\- %@&]*\*[^\w\d\- %@&]*/)) {
    last = matches.index + matches[0].length
    matches[0] = matches[0].replace(/^\*/, '([_\.\(\)!\\ %@&a-zA-Z0-9-]+)')
    out += vurl.substr(0, matches.index) + matches[0]
  }

  vurl = out += vurl.substr(last)

  var captures = vurl.match(/:([^\/]+)/ig)

  if (captures) {
    length = captures.length
    for (; i < length; i++) {
      cache[key].captures.push(captures[i].slice(1))
      vurl = vurl.replace(captures[i], '([._:!\\sa-zA-Z0-9-]+)')
    }
  }

  cache[key].regexp = new RegExp(vurl)

  return cache[key]
}

function paramify(url) {
  try { url = decodeURI(url) } catch($) {}
  paramify.url = url
  return paramify
}

module.exports = paramify

paramify.match = function(vurl) {

  var ourl = regify(vurl)
  var i = 1
  var j = 0
  var matches = paramify.url.match(ourl.regexp)

  if (!matches) {
    return false
  }

  paramify.match.params = {}

  for (; i < matches.length; i++, j++) {
    paramify.match.params[ourl.captures[j]] = matches[i]
  }

  return true
}
