import Lobby from '../Lobby'
import User from '../User'
import PusoyLobby from './Pusoy/PusoyLobby'
import CustomError from '../../utils/CustomError'
import Game from './Game'
import PusoyGame from './Pusoy/PusoyGame'

class CoreGame {
  private lobbies: Lobby[] = []

  private users: User[] = []

  public addUser(): User {
    const user = new User()
    this.users.push(user)
    return user
  }

  public createLobby(game: GameType, user: User): Lobby {
    if (this.userIsInLobby(user)) {
      throw new LobbyError('User is already in a lobby.')
    }

    let lobby = null
    if (game === GameType.PUSOY) {
      lobby = new PusoyLobby(user)
    } else {
      throw new Error('Invalid Game')
    }

    this.lobbies.push(lobby)
    return lobby
  }

  public joinLobby(lobbyId: string, user: User): Lobby {
    if (this.userIsInLobby(user)) {
      throw new LobbyError('User is already in a lobby.')
    }

    const lobby = this.getLobbyById(lobbyId)
    lobby.addUser(user)
    return lobby
  }

  public userIsInLobby(user: User): boolean {
    return Boolean(this.lobbies.find((lobby: Lobby) => {
      return lobby.hasUser(user)
    }))
  }

  public getLobbyById(lobbyId: string): Lobby {
    return this.lobbies.find((lobby: Lobby) => {
      return lobby.id === lobbyId
    })
  }

  public startGameFromLobby(lobbyId: string): Game {
    const lobby = this.getLobbyById(lobbyId)
    return new lobby.game(this.users)
  }

}

export class LobbyError extends CustomError {}

export enum GameType {
  PUSOY = 'pusoy'
}

export default new CoreGame()
