var proto = require("proto")
var Peer = require('simple-peer')

var rpep = require("rpep")
var websockets = require("rpep-websockets/ws.browser")
var webrtc = require("rpep-webrtc/rpep-webrtc.browser")
var msgpack = require("rpep-msgpack")
var json = require("rpep/serialization/json")
var decentralWebrtc = require("rpep-decentral-webrtc")

var div = document.createElement('div')
document.body.appendChild(div)

var signalServerPort = 8080

var rtcPeer = rpep(decentralWebrtc({
    host:location.host, port:signalServerPort,
    signalServerTransport: websockets(), rtcTransport: webrtc()
}), msgpack)
rtcPeer.respond('hi', function() {
    log('hi')
    return 'wassup'
})

rtcPeer.connect('::ffff:127.0.0.1').then(function(conn) {
    conn.request('hi').then(function(response) {
        log(response)
    })
    conn.on('close', function() {
        log("Bye")
    })
    conn.on('error', function(e) {
        log(e)
    })
}).catch(function(e) {
    log(e+"<br>\n"+ (e.errors||[]).join('<br>\n'))
})

function log(d) {
    console.log(d)
    var log = document.createElement('div')
    log.innerHTML = d
    div.appendChild(log)
}