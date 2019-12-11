import { Card } from '../../Deck'
import PusoyPlayedHand from './PusoyPlayedHand'

class PusoyPile {
  private playedHands: PusoyPlayedHand[] = []

  public get numHandsPlayed(): number {
    return this.playedHands.length
  }

  public get lastHand(): PusoyPlayedHand {
    return this.playedHands[this.numHandsPlayed - 1]
  }

  public playHand(hand: Card[]): boolean {
    const playedHand = new PusoyPlayedHand(hand)

    return false
  }
}

export default PusoyPile
