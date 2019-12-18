import * as uuid from 'uuid/v4'
import User from './User'

class Lobby {
  protected users: User[] = []

  protected lobbyOwner: User = null

  public readonly id: string

  public readonly game = null

  constructor(owner: User) {
    this.lobbyOwner = owner
    this.id = uuid()
  }

  addUser(user: User): void {
    this.users.push(user)
  }

  isOwner(user: User): boolean {
    return user.id === this.lobbyOwner.id
  }

  hasUser(user: User): boolean {
    if (this.lobbyOwner.id === user.id) {
      return true
    }

    return Boolean(this.users.find((u: User) => {
      return u.id === user.id
    }))
  }
}

export default Lobby
