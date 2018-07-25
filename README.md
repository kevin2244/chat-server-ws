# chat-server-ws

A simple Websockets based chat server using the Node.js [ws](https://github.com/websockets/ws) package.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* A working installation of [Node.js](https://nodejs.org/en/)


* An available port.


### Installing

Clone the repository.

Install dependencies from within the cloned repository directory

```
npm install
```

You should ensure a port is available for connecting clients, which
is port 3000 by default.

## Features

This chat server allows multiple clients to connect and allow users to chat.

It makes use of ws's facility to use ping/pong messages to detect broken connections
between server and client. If a broken connection is detected, the connection is
forcibly closed.

Clients are uniquely identified.

The chat server periodically broadcasts a message to all connected clients.

## Built with

* [Node v8.11.2](https://nodejs.org/en/)

## Authors

* **Kevin Smith**

## License

[MIT](https://github.com/kevin2244/chat-server-ws/blob/master/LICENSE.md)


## See Also
See also the corresponding chat client package you can use to connect to this chat server via a browser:
[react-client-chat](https://github.com/kevin2244/react-client-chat)
