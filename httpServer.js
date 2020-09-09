var http = require('http')
var https = require('https')
var url = require('url')
var fs = require('fs')
var path = require('path')

var baseDirectory = __dirname

http.createServer(function (request, response) {
    try {
        var requestUrl = url.parse(request.url)

        var filepath = requestUrl.pathname
        if(filepath in {'/':1,'':1}) {
            filepath = '/src/client.html'
        }

        // Need to use path.normalize so people can't access directories underneath baseDirectory.
        var fullPath = baseDirectory+path.normalize(filepath)

        var fileStream = fs.createReadStream(fullPath)
        fileStream.pipe(response)
        fileStream.on('open', function() {
            response.writeHead(200)
        })
        fileStream.on('error',function(e) {
            console.log("file doesn't exist: "+e)
            response.writeHead(404)     // Assume the file doesn't exist.
            response.end()
        })
    } catch(e) {
        response.writeHead(500)
        response.end()     // End the response so browsers don't hang.
        console.log(e.stack)
    }
}).listen(80, function() {
    console.log("listening on port 80")
})