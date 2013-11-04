var fs = require('fs')
var http = require('http')
var paramify = require('../')

http.createServer(function (req, res) {

  var match = paramify(req.url)
  res.writeHead(200, {'Content-Type': 'text/plain'})

  if (match('intro/:greeting')) {

    intro(match.params, res)
  }
  else if (match('showtimes/:start/:end')) {

    showtimes(match.params, res)
  }
  else if (match('files/*')) {

    serveFile(match.params, res)
  }

}).listen(1337, '127.0.0.1')

function intro(params, res) {

  res.end('Greeting was "' + params.greeting + '"\n')
}

function showtimes(params, res) {

  var message = [
    'Show starts at', params.start, 
    'and ends at', params.end
  ].join(' ') + '\n'

  res.end(message)
}

function serveFile(params, res) {
  // match.params contains numeric keys for any
  // path components matched with *
  fs.createReadStream(__dirname + '/static/' + params[0]).pipe(res)
}

console.log('Server running at http://127.0.0.1:1337/')
