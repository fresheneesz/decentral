

// On connection to the network

// 1. Attempt to connect the highest quality nodes you have connected to before.
// 2. If more connections are needed, check your database and connect to the highest priority nodes
// 3. If more connections are needed, go through a passed list of addresses and address repositories in
//    order and connect
//    to addresses there. Each item could either be a specific node to connect to or a web address that
//    may return a list of nodes.

// On connection to a peer

// 1. If its a new peer, get its public key for future authentication. If its a peer you've connected
//    to before, authenticate against their public key with a challenge.
// 2. Get decentral version and capabilities.
// 3. Get addresses from peer

// Periodically

// * Get new addresses from peer

// Ongoing messages

// GetData

// SendData

// GetAddresses

// On disconnection from a peer

// 1. If you need more connections, connect to another peer.

// On ban of a peer

// 1. Record public key and IP address in ban record.