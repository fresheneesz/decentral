var rpep = require("rpep")
var websockets = require("rpep-websockets/ws.node")
var webrtc = require("rpep-webrtc/rpep-webrtc.node")
var msgpack = require("rpep-msgpack")
var decentralWebrtc = require("rpep-decentral-webrtc")
var Network = require("Network")
var constants = require("constants.js")

var signalServerPort = 8080

var network = Network({
    Peer: require("Peer"),
    maxOutgoingConnections: 1,
    maxIncomingConnections: 1,
    addressSeedList: [
        {type: 'peer', address: {
            signalServerHost: '192.168.1.3',
            signalServerPort: constants.signalServerPort,
            peerAddress: '192.168.1.3'
        }}
    ]
})

network.on('error', function(e) {
    console.log(e)
})

network.connect()

// Peer - An extension of the Peer class, which represents a connection to a peer.
// addressSeedList - An array of peer addresses or address sources in priority order of what to try
//                   first. where each object has the following properties:
// * type - Either 'peer' or 'list'.
// * address - If type is 'peer', this address is the address of a peer to connect to. If type
//             is 'list', this is an http hostname that returns a list of peer addresses as a csv.
//             Each peer address is an object with the following three parts:
//   * signalServerHost
//   * signalServerPort
//   * peerAddress
// rpep - An RPEP peer object that will be used to make listen for and make connections.
// maxIncomingConnections - Default 14.
// maxOutgoingConnections - Default 14.



//var rtcServer = rpep(decentralWebrtc({
//    host:'localhost', port:signalServerPort,
//    signalServerTransport: websockets(), rtcTransport: webrtc()
//}), msgpack)
//rtcServer.respond('hi', function() {
//    console.log('hi')
//    return 'wassup'
//})
//rtcServer.on('error', function(e) {
//    console.error(e)
//})
//var connection
//rtcServer.listen(function(request) {
//    var conn = connection = request.accept()
//    conn.on('close', function() {
//        console.log("closed!")
//        connection = undefined
//    })
//    conn.on('error', function(e) {
//        if(e.code === 'ERR_ICE_CONNECTION_FAILURE') {
//            console.log(e)
//        } else {
//            throw e
//        }
//    })
//})
//
//process.on('SIGINT', function() {
//    if(connection) connection.close()
//    rtcServer.on('close', function() {
//        process.exit()
//    })
//    rtcServer.close()
//})
