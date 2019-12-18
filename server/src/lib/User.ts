import * as uuid from 'uuid/v4'
import Lobby from './Lobby'
import CoreGame from './games/CoreGame'

class User {
  private lobby: Lobby = null

  public readonly id: string

  constructor() {
    this.id = uuid()
  }

  public joinLobby(lobbyId: string): Lobby {

  }
}

export default User
