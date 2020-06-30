var proto = require("proto")
var Peer = require('simple-peer')

var rpep = require("rpep")
var websockets = require("rpep-websockets/ws.browser")
var webrtc = require("rpep-webrtc.browser")
var msgpack = require("rpep-msgpack")
var json = require("rpep/serialization/json")
var rtcConnect = require("rtc-connect")

var div = document.createElement('div')
document.body.appendChild(div)

var signalServerPort = 8080

var rtcPeer = rpep(webrtc(), msgpack)
rtcPeer.respond('hi', function() {
    log('hi')
    return 'wassup'
})
rtcPeer.on('close', function() {
    log("Bye")
})
rtcPeer.on('error', function(e) {
    log(e)
})

rtcConnect.connect(rtcPeer, websockets(), 'listener', {host:location.host, port:signalServerPort}).then(function(conn) {
    conn.request('hi').then(function(response) {
        log(response)
    })
}).catch(function(e) {
    log(e)
})

function log(d) {
    console.log(d)
    var log = document.createElement('div')
    log.innerHTML = d
    div.appendChild(log)
}