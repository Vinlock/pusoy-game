import { Card } from '../../Deck'
import PusoyPlayedHand from './PusoyPlayedHand'

class PusoyPile {
  private playedHands: PusoyPlayedHand[] = []

  public get numHandsPlayed(): number {
    return this.playedHands.length
  }

  public get lastHand(): PusoyPlayedHand | null {
    return this.playedHands[this.numHandsPlayed - 1] || null
  }

  public playHand(hand: PusoyPlayedHand, allPassed: boolean = false): boolean {
    if (allPassed || hand.beats(this.lastHand)) {
      this.playedHands.push(hand)
      return true
    }
    return false
  }
}

export default PusoyPile
