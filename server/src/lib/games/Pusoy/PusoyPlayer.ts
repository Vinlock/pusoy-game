import * as uuid from 'uuid/v4'
import { Card } from '../Deck'
import PusoyPlayedHand from './PusoyPlayedHand'
import CustomError from '../../../utils/CustomError'
import Player from '../../Player'
import User from '../../User'

class PusoyPlayer extends Player {
  public readonly id: string

  private playerNumber: number

  private hand: Card[] = []

  constructor(user: User, hand: Card[] = []) {
    super(user)
    this.id = uuid()

    if (hand.length > 0) {
      hand.forEach((card: Card) => {
        this.addCardToHand(card)
      })
    }
  }

  public get number(): number {
    return this.playerNumber
  }

  public setPlayerNumber(num: number): void {
    this.playerNumber = num
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
    const playedHandCards = playedHand.getCards()
    playedHandCards.forEach((card: Card) => {
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

  /**
   * Get Lowest Card
   */
  public lowestCard(): Card {
    this.sortHandLowestToHighest()
    return this.hand[0]
  }
}

export class HandError extends CustomError {}

export default PusoyPlayer
