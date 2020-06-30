var signalServer = require("signalServer")

var port = 8080
var server = signalServer(port)
server.on('error', function(e) {
    console.error(e)
})

console.log("Signal server listening on port "+port)