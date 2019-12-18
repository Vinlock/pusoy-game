import * as http from 'http'
import app from './app'
import socket from './socket'

const { APP_PORT } = process.env

const port = Number(APP_PORT || 3000)

const httpServer = http.createServer(app)

// Add socket
socket(httpServer)

httpServer.listen(port, () => {
  console.log(`Server started on port ${port}.`)
})
