import { Card, Rank } from '../../Deck'

class PusoyPlayedHand {
  private cards: Card[]

  public readonly isValidHand: boolean = false

  public readonly isDoubles: boolean = false
  public readonly isStraight: boolean = false
  public readonly isFlush: boolean = false
  public readonly isStraightFlush: boolean = false
  public readonly isRoyalFlush: boolean = false
  public readonly isFourOfAKind: boolean = false
  public readonly isFullHouse: boolean = false

  constructor(hand: Card[]) {
    this.cards = hand

    this.isDoubles = this.checkIsDoubles()
    if (!this.isDoubles) {
      this.isStraight = this.checkIsStraight()
      this.isFlush = this.checkIsFlush()
      this.isStraightFlush = this.isStraight && this.isFlush
      this.isRoyalFlush = this.checkIsRoyalFlush()
      this.isFourOfAKind = this.checkIsFourOfAKind()
      this.isFullHouse = this.checkIsFullHouse()
    }

    if ([
      this.isDoubles,
      this.isStraight,
      this.isFlush,
      this.isStraightFlush,
      this.isRoyalFlush,
      this.isFourOfAKind,
      this.isFullHouse,
    ].some((test: boolean) => test) || (this.numCards === 1)) {
      this.isValidHand = true
    }
  }

  public get numCards(): number {
    return this.cards.length
  }

  private checkIsDoubles(): boolean {
    if (this.numCards !== 2) {
      return false
    }

    return this.cards[0].rank === this.cards[1].rank
  }

  private checkIsStraight(): boolean {
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

  private checkIsFlush(): boolean {
    if (this.numCards !== 5) {
      return false
    }

    return this.cards.every((card: Card) => {
      return card.suit === this.cards[0].suit
    })
  }

  private checkIsRoyalFlush(): boolean {
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
    }) && (this.isFlush || this.checkIsFlush())
  }

  private checkIsFullHouse(): boolean {
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

  private checkIsFourOfAKind(): boolean {
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
