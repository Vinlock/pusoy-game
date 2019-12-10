import {Card, Rank, Suit} from '../../Deck'

class PusoyPlayedHand {
  private cards: Card[]

  constructor(hand: Card[]) {
    this.cards = hand
  }

  public get numCards(): number {
    return this.cards.length
  }

  public get isStraight(): boolean {
    const ranks = this.cards.map((card: Card) => {
      return card.rank
    }).filter((v: Rank, i: number, self: Rank[]) => {
      return self.indexOf(v) === i
    })

    if (ranks.length !== 5) {
      return false
    }

    const sortedCards = this.cards.sort((a: Card, b: Card) => {
      return a.rank - b.rank
    })

    return sortedCards.every((card: Card, index: number) => {
      if (index === 4) {
        return true
      }

      const nextRank = card.rank + 1
      if (!Card.isValidRank(nextRank)) {
        return false
      }

      return card.rank + 1 === sortedCards[index + 1].rank
    })
  }

  public get isFlush(): boolean {
    if (this.numCards !== 5) {
      return false
    }

    return this.cards.every((card: Card) => {
      return card.suit === this.cards[0].suit
    })
  }

  public get isStraightFlush(): boolean {
    return this.isStraight && this.isFlush
  }

  public get isRoyalFlush(): boolean {
    if (this.numCards !== 5) {
      return false
    }

    const neededRanks = [
      Rank.ACE,
      Rank.KING,
      Rank.QUEEN,
      Rank.JACK,
      Rank.TEN,
    ]

    return this.cards.every((card: Card) => {
      if (neededRanks.includes(card.rank)) {
        const indexToDelete: number = neededRanks.indexOf(card.rank)
        delete neededRanks[indexToDelete]
        return true
      }
      return false
    }) && this.isFlush
  }

  public get isFullHouse(): boolean {
    if (this.numCards !== 5) {
      return false
    }

    // Find the two different ranks
    const group1: Card[] = []
    const group2: Card[] = []

    this.cards.forEach((card: Card, index: number) => {
      if (index === 0) {
        group1.push(card)
      } else {
        if (group1[0].rank === card.rank) {
          group1.push(card)
        } else {
          group2.push(card)
        }
      }
    })

    // Check if group 2 has all the same rank
    const group2Good = group2.every((card: Card) => {
      return card.rank === group2[0].rank
    })

    if (!group2Good) {
      return false
    }

    // Check that both arrays are correct lengths
    return (group1.length === 3 && group2.length === 2) ||
      (group1.length === 2 && group2.length === 3)
  }

  public get isFourOfAKind(): boolean {
    if (this.numCards !== 5) {
      return false
    }

    // Find the two different suits
    const group1: Card[] = []
    const group2: Card[] = []

    this.cards.forEach((card: Card, index: number) => {
      if (index === 0) {
        group1.push(card)
      } else {
        if (group1[0].rank === card.rank) {
          group1.push(card)
        } else {
          group2.push(card)
        }
      }
    })

    return (group1.length === 4 && group2.length === 1) ||
      (group1.length === 1 && group2.length === 4)
  }
}

export default PusoyPlayedHand
