var rpep = require("rpep")
var websockets = require("rpep-websockets/ws.node")
var webrtc = require("rpep-webrtc.node")
var msgpack = require("rpep-msgpack")
var rtcConnect = require("rtc-connect")

var signalServerPort = 8080

var rtcPeer = rpep(webrtc(), msgpack)
rtcPeer.respond('hi', function() {
    console.log('hi')
    return 'wassup'
})
rtcPeer.on('error', function(e) {
    console.error(e)
})

rtcConnect.connect(rtcPeer, websockets(), 'listener', {host:'localhost', port:signalServerPort}).then(function(conn) {
    conn.request('hi').then(function(response) {
        console.log(response)
    })

    process.on('SIGINT', function() {
        conn.close()
        process.exit()
    })
})