import { EventEmitter } from 'events'
import CardStack from './CardStack'

class Deck extends CardStack {
  public static getAllCards(includeJokers = false): Card[] {
    const cards: Card[] = []
    allSuits.forEach((suit: Suit) => {
      allRanks.forEach((rank: Rank) => {
        cards.push(new Card(suit, rank))
      })
    })
    if (includeJokers) {
      cards.push(new Card(Suit.JOKER, Rank.JOKER))
      cards.push(new Card(Suit.JOKER, Rank.JOKER))
    }
    return cards
  }

  constructor(withJokers: boolean = false) {
    super()
    this.cards = []
    this.reset(withJokers)
    this.shuffle(10)
  }

  public getCards(): Card[] {
    return this.cards
  }

  public reset(withJokers: boolean = false): void {
    this.cards = Deck.getAllCards(withJokers)
  }

  public shuffle(times: number = 1): void {
    const deck = this.cards
    let numShuffles = times
    do {
      let currentIndex = deck.length
      let tempVal, randomIndex

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        tempVal = deck[currentIndex]
        deck[currentIndex] = deck[randomIndex]
        deck[randomIndex] = tempVal
      }

      this.cards = deck
      numShuffles--
    } while (numShuffles > 0)
  }

  public deal(): Card {
    return this.cards.pop()
  }

  public get numCards(): number {
    return this.cards.length
  }
}

export class Card {
  public static isValidRank(rank: number): boolean {
    return Object.values(Rank).includes(rank)
  }

  public suit: Suit
  public rank: Rank

  constructor(suit: Suit, rank: Rank) {
    this.suit = suit
    this.rank = rank
  }

  public is(card: Card): boolean {
    return card.rank === this.rank && card.suit === this.suit
  }

  public beats(card: Card): boolean {
    if (card.rank === this.rank) {
      return this.suit > card.suit
    }
    return this.rank > card.rank
  }
}

export enum Suit {
  CLUBS = 0,
  SPADES = 1,
  HEARTS = 2 ,
  DIAMONDS = 3,
  JOKER = 4,
}

export enum Rank {
  THREE = 0,
  FOUR = 1,
  FIVE = 2,
  SIX = 3,
  SEVEN = 4,
  EIGHT = 5,
  NINE = 6,
  TEN = 7,
  JACK = 8,
  QUEEN = 9,
  KING = 10,
  ACE = 11,
  TWO = 12,
  JOKER = 13,
}

export const allSuits: Suit[] = [
  Suit.CLUBS,
  Suit.SPADES,
  Suit.HEARTS,
  Suit.DIAMONDS,
]

export const allRanks: Rank[] = [
  Rank.THREE,
  Rank.FOUR,
  Rank.FIVE,
  Rank.SIX,
  Rank.SEVEN,
  Rank.EIGHT,
  Rank.NINE,
  Rank.TEN,
  Rank.JACK,
  Rank.QUEEN,
  Rank.KING,
  Rank.ACE,
  Rank.TWO,
]

export default Deck
