var rpep = require("rpep")
var websockets = require("rpep-websockets/ws.node")
var webrtc = require("rpep-webrtc.node")
var msgpack = require("rpep-msgpack")
var rtcConnect = require("rtc-connect")

var signalServerPort = 8080

var rtcServer = rpep(webrtc(), msgpack)
rtcServer.respond('hi', function() {
    console.log('hi')
    return 'wassup'
})
rtcServer.on('error', function(e) {
    console.error(e)
})
var connection
rtcConnect.listen(rtcServer, websockets(), 'listener', {host:'localhost', port:signalServerPort}, function(request) {
    var conn = connection = request.accept()
})

process.on('SIGINT', function() {
    if(connection) connection.close()
    rtcServer.close()
    process.exit()
})
