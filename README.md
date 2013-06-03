# SYNOPSIS
Parses tokens out of urls and returns an object with their values

# MOTIVATION
For when you want url parameters but not a big bloated router

# USAGE
```js
var http = require('http')
var paramify = require('paramify')

http.createServer(function (req, res) {

  var match = paramify(req.url).match
  res.writeHead(200, {'Content-Type': 'text/plain'})

  if (match('intro/:greeting')) {

    intro(match.params, res)
  }
  else if (match('showtimes/:start/:end'))

    showtimes(match.params, res)
  }
}).listen(1337, '127.0.0.1')

function intro(params, res) {

  res.end('Greeting was "' + params.greeting + '"\n')
}

function showtimes(params, res) {

  var message = [
    'Show starts at', match.params.start, 
    'and ends at', match.params.end
  ].join(' ') + '\n'

  res.end(message)
}

console.log('Server running at http://127.0.0.1:1337/')
```

Given the following url
```
http://localhost:1337/showtimes/10:00AM/8:30PM
```

The server would respond with
```
Show starts at 10:00 and ends at 8:30
```

Given the following url
```
http://localhost:1337/intro/Hello%20world!
```

The server would respond with
```
Greeting was "Hello world!"
```
