var http = require('http')
var paramify = require('..')

http.createServer(function (req, res) {

  var match = paramify(req.url).match
  res.writeHead(200, {'Content-Type': 'text/plain'})

  if (match('intro/:greeting')) {

    intro(match.params, res)
  }
  else if (match('showtimes/:start/:end')) {

    showtimes(match.params, res)
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
