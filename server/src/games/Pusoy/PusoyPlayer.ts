import * as uuid from 'uuid/v4'
import { Card } from '../../Deck'
import PusoyPlayedHand from './PusoyPlayedHand'
import CustomError from '../../utils/CustomError'

class PusoyPlayer {
  public readonly id: string

  private hand: Card[] = []

  constructor() {
    this.id = uuid()
  }

  public get cardsInHand(): Card[] {
    return this.hand
  }

  public addCardToHand(card: Card): void {
    this.hand.push(card)
    this.sortHandLowestToHighest()
  }

  /**
   * Check if player contains all the cards to play the hand
   * @param {PusoyPlayedHand} playedHand The hand being played
   * @returns {boolean} If the player is able to play the hand
   */
  public canPlayHand(playedHand: PusoyPlayedHand): boolean {
    const currentHand: Card[] = this.hand
    const foundIndexes: number[] = []
    playedHand.getCards().forEach((card: Card) => {
      const foundIndex: number = currentHand.findIndex((c: Card, index: number) => {
        return card.is(c) && !foundIndexes.includes(index)
      })
      foundIndexes.push(foundIndex)
    })
    return foundIndexes.length === playedHand.numCards;
  }

  /**
   * Play the hand
   * @param {PusoyPlayedHand} playedHand The hand being played
   * @returns {boolean} If the hand was played
   */
  public playHand(playedHand: PusoyPlayedHand): boolean {
    const indexesToDelete: number[] = []
    playedHand.getCards().forEach((card: Card) => {
      const foundIndex: number = this.hand.findIndex((c: Card, index: number) => {
        return card.is(c) && !indexesToDelete.includes(index)
      })
      indexesToDelete.push(foundIndex)
    })
    if (indexesToDelete.length === playedHand.numCards) {
      indexesToDelete.forEach((index: number) => {
        delete this.hand[index]
      })
      this.sortHandLowestToHighest()
      return true
    }
    return false
  }

  public sortHandLowestToHighest(): void {
    this.hand = this.hand.sort((a: Card, b: Card): number => {
      if (a.beats(b)) {
        return 1
      } else {
        return -1
      }
    })
  }

  public lowestCard(): Card {
    this.sortHandLowestToHighest()
    return this.hand[0]
  }
}

export class HandError extends CustomError {}

export default PusoyPlayer
