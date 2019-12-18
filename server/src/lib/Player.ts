import User from './User'

class Player {
  private linkedUser: User = null

  constructor(user: User) {
    this.linkedUser = user
  }
}

export default Player
