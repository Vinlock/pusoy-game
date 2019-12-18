import * as http from 'http'
import * as SocketIo from 'socket.io'
import CoreGame, { GameType } from './lib/games/CoreGame'


export default (server: http.Server) => {
  const io = SocketIo(server, {
    path: '/socket',
  })

  io.on('connection', (socket: SocketIo.Socket) => {
    const user = CoreGame.addUser()

    // Create a lobby
    socket.on('create_lobby', async (game: GameType) => {
      try {
        const lobby = CoreGame.createLobby(game, user)
        socket.join(game)
        socket.join(`lobby_${lobby.id}`)
        socket.emit('lobby_joined', lobby.id, lobby.game)
      } catch (err) {
        socket.emit('already_in_lobby')
      }
    })

    socket.on('join_lobby', async (lobbyId: string) => {
      try {
        const lobby = CoreGame.joinLobby(lobbyId, user)
        socket.join(lobby.game)
        io.to(`lobby_${lobby.id}`).emit('user_joined')
        socket.join(`lobby_${lobby.id}`)
        socket.emit('lobby_joined', lobby.id, lobby.game)
      } catch (err) {
        socket.emit('already_in_lobby')
      }
    })

    socket.on('start_game', async () => {

    })

    socket.on('disconnect', async () => {
      CoreGame.disconnectUser(user.id)
    })
  })
}
