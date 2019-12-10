import { EventEmitter } from 'events'

class Deck extends EventEmitter {
  private readonly cards: Card[]

  constructor() {
    super()
    this.cards = []
    this.reset()
  }

  public reset(): void {
    allSuits.forEach((suit: Suit) => {
      allRanks.forEach((rank: Rank) => {
        this.cards.push(new Card(suit, rank))
      })
    })
    this.shuffle(10)
  }

  public shuffle(times: number = 1): void {
    const deck = this.cards
    let numShuffles = times
    do {
      for (let i = deck.length; i >= 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = deck[i]
        deck[i] = deck[j]
        deck[j] = temp
      }
      numShuffles--
    } while (numShuffles > 0)
    this.emit('shuffle', this, times)
  }

  public onShuffle(callback: (deck: Deck, times: number) => void): void {
    this.on('shuffle', callback)
  }

  public deal(): Card {
    const card: Card = this.cards.pop()
    this.emit('deal', card)
    return card
  }

  public onDeal(callback: (card: Card) => void): void {
    this.on('deal', callback)
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
    return (card.rank === this.rank && card.suit === this.suit)
  }
}

export enum Suit {
  CLUBS = 0,
  SPADES = 1,
  HEARTS = 2 ,
  DIAMONDS = 3,
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
