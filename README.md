[![build-status](https://www.codeship.io/projects/d3823ea0-4c7c-0131-4b68-527aab6d00bd/status)](https://www.codeship.io/projects/11258)

# SYNOPSIS
Parses urls so you can "route"

# MOTIVATION
For when you want url parameters but not a big bloated router

# USAGE
```js
var fs = require('fs')
var http = require('http')
var paramify = require('paramify')

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
```

Given the following url
```
http://localhost:1337/showtimes/10:00AM/8:30PM
```

The server would respond with
```
Show starts at 10:00AM and ends at 8:30PM
```

Given the following url
```
http://localhost:1337/intro/Hello%20world!
```

The server would respond with
```
Greeting was "Hello world!"
```

Given the following url
```
http://localhost:1337/files/users/1/description.txt
```

The server would respond with the contents of `static/users/1/description.txt`.
