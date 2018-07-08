const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 3000 })

console.log('Chat Server Starting up..')

function noop () {}

function heartbeat () {
  console.log('Pong: connection ' + this.id + 'is Alive..')
  this.isAlive = true
}

wss.on('connection', function connection (ws, req) {
  ws.isAlive = true

  ws.id = req.headers['sec-websocket-key']
  console.log('CONNECTEDID: ' + ws.id)

  ws.on('pong', heartbeat)

  for (var prop in req.headers) {
    console.log(prop, req.headers[prop])
  }

  ws.on('message', function incoming (message) {
    console.log('received: %s', message)
    console.log('SUB: ' + message.substring(0, 6))

    // Handle client pseudo pings
    // send pseudo ping message back to sender...
    if (message.substring(0, 6) === '_PING_') {
      ws.send(message)
      return
    }

    // echo message back to sender
    ws.send('> ' + message)

    // send message to all clients, apart from sender
    wss.clients.forEach(function each (client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(ws.id + ' > ' + message)
      }
    })
  })

  ws.on('close', function close () {
    console.log(ws.id + ' has closed')
  })

  ws.send('Hello, server here, thanks for connecting ')
})

// Ping clients at 30s intervals
setInterval(function ping () {
  console.log('Starting Interval loop...')

  wss.clients.forEach(function each (ws) {
    if (ws.isAlive === false) {
      console.log('Terminating: ')
      return ws.terminate()
    }
    console.log('Set Alive to false, send ping...')
    ws.isAlive = false
    ws.ping(noop)
  })
}, 30000)

// Broadcast Message to all clients at 5 minute intervals
setInterval(function broadcast () {
  var d = new Date()
  var formatd = d.toLocaleString()

  wss.clients.forEach(function each (ws) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send('SERVER BROADCAST: DateTime : ' + formatd)
    }
  })
}, 300000)
