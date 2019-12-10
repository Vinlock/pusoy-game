import * as uuid from 'uuid/v4'
import PusoyHand from './PusoyHand'
import { Card } from '../../Deck'

class PusoyPlayer {
  public static createPlayers(numPlayers: number) {
    return Array.from({
      length: numPlayers,
    }, (_, i) => {
      return new PusoyPlayer()
    })
  }

  public readonly id: string

  public hand: PusoyHand

  constructor() {
    this.id = uuid()
    this.hand = new PusoyHand()
  }

  public addCardToHand(card: Card): void {

  }
}

export default PusoyPlayer
