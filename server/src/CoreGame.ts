import * as http from 'http'
import * as express from 'express'
import * as SocketIO from 'socket.io'

class CoreGame {
  private readonly expressApp: express.Application
  private readonly httpServer: http.Server
  private readonly socketServer: SocketIO.Server

  constructor(port = 8000) {
    this.expressApp = express()
    this.httpServer = http.createServer(this.expressApp)
    this.socketServer = SocketIO(this.httpServer)
    this.httpServer.listen(port, () => {
      console.log('Server started on port %s', port)
    })

    this.socketServer.on('connect', (socket: SocketIO.Socket) => {
      console.log('Connected client on port %s', port)
      socket.on('message', (m: any) => {
        console.log('message received', m)
      })
    })
  }

  public get app() {
    return this.expressApp
  }

  public get socket() {
    return this.socketServer
  }

  public get server() {
    return this.httpServer
  }

}

export default CoreGame
