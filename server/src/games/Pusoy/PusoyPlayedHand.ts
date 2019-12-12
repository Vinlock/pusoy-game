import { allRanks, allSuits, Card, Rank, Suit } from '../../Deck'
import CardStack from '../../CardStack'
import CustomError from '../../utils/CustomError'

const validCards = []
allSuits.forEach((suit: Suit) => {
  allRanks.forEach((rank: Rank) => {
    validCards.push(new Card(suit, rank))
  })
})


class PusoyPlayedHand extends CardStack {
  public readonly ownerId: string | null = null

  public readonly isValidHand: boolean = false

  public readonly isSingle: boolean = false
  public readonly isDoubles: boolean = false
  public readonly isFiveCardHand: boolean = false
  public readonly isStraight: boolean = false
  public readonly isFlush: boolean = false
  public readonly isStraightFlush: boolean = false
  public readonly isRoyalFlush: boolean = false
  public readonly isFourOfAKind: boolean = false
  public readonly isFullHouse: boolean = false
  public readonly fiveCardHandType: HandRank

  constructor(hand: Card[], ownerId: string | null = null) {
    super()

    // Check for duplicate cards
    const seen = new Set();
    const hasDuplicates = hand.some((card: Card) => {
      return seen.size === seen.add(`${card.rank}_${card.suit}`).size;
    });

    if (hasDuplicates) {
      throw new DuplicateCardError('Duplicate card detected.')
    }

    // Store cards
    this.cards = hand

    // Determine hand type
    this.isSingle = this.numCards === 1

    if (!this.isSingle) {
      this.isDoubles = this.checkIsDoubles()
    }

    if (!this.isDoubles && this.numCards === 5) {
      this.isFiveCardHand = true

      this.isStraight = this.checkIsStraight()
      if (this.isStraight) {
        this.fiveCardHandType = HandRank.STRAIGHT
      }

      this.isFlush = this.checkIsFlush()
      if (this.isFlush) {
        this.fiveCardHandType = HandRank.FLUSH
      }

      this.isFullHouse = this.checkIsFullHouse()
      if (this.isFullHouse) {
        this.fiveCardHandType = HandRank.FULL_HOUSE
      }

      this.isFourOfAKind = this.checkIsFourOfAKind()
      if (this.isFourOfAKind) {
        this.fiveCardHandType = HandRank.FOUR_OF_A_KIND
      }

      this.isStraightFlush = this.isStraight && this.isFlush
      if (this.isStraightFlush) {
        this.fiveCardHandType = HandRank.STRAIGHT_FLUSH
      }

      this.isRoyalFlush = this.checkIsRoyalFlush()
      if (this.isRoyalFlush) {
        this.fiveCardHandType = HandRank.ROYAL_FLUSH
      }
    }

    if (!this.isSingle && !this.isDoubles && !this.isFiveCardHand) {
      throw new InvalidNumberOfCards(`Invalid number of cards, must be 1, 2, or 5. Received ${this.numCards}.`)
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
    } else {
      throw new InvalidHand('Invalid set of cards.')
    }
  }

  public getCards(): Card[] {
    return this.cards
  }

  public beats(hand: PusoyPlayedHand): boolean {
    if (hand.numCards !== this.numCards) {
      throw new InvalidNumberOfCards('Hands contain a different number of cards.')
    }

    if (hand.isSingle) {
      return this.cards[0].beats(hand.cards[0])
    } else if (hand.isDoubles) {
      const thisRank = this.cards[0].rank
      const opposingRank = hand.cards[0].rank
      if (thisRank === opposingRank) {
        const thisHighSuit = this.cards[0].suit > this.cards[1].suit ? this.cards[0].suit : this.cards[1].suit
        const opposingHighSuit = hand.cards[0].suit > hand.cards[1].suit ? hand.cards[0].suit : hand.cards[1].suit
        return thisHighSuit > opposingHighSuit
      }
      return thisRank > opposingRank
    } else if (hand.isFiveCardHand && this.fiveCardHandType !== null) {
      if (this.fiveCardHandType === hand.fiveCardHandType) {
        if (this.isRoyalFlush && hand.isRoyalFlush) {
          const thisCollectiveSuit: Suit = this.cards[0].suit
          const opposingCollectiveSuit: Suit = hand.cards[0].suit
          return thisCollectiveSuit > opposingCollectiveSuit
        } else if (this.isStraightFlush && hand.isStraightFlush) {
          const greatestToLeast = (a: Card, b: Card) => {
            return b.rank - a.rank
          }
          const thisSortedCards: Card[] = this.cards.sort(greatestToLeast)
          const handSortedCards: Card[] = hand.cards.sort(greatestToLeast)
          if (thisSortedCards[0].rank === handSortedCards[0].rank) {
            return thisSortedCards[0].suit > handSortedCards[0].suit
          }
          return thisSortedCards[0].rank > handSortedCards[0].rank
        } else if (this.isFourOfAKind && hand.isFourOfAKind) {
          type FourOfAKindBreakDown = {
            fourOfAKind: Card[]
            extraCard: Card
          }

          const reduceFn = (total: FourOfAKindBreakDown, currentCard: Card): FourOfAKindBreakDown => {
            if (total.fourOfAKind.length === 0 && total.extraCard === null) {
              total.extraCard = currentCard
            } else if (total.fourOfAKind.length > 0 && total.fourOfAKind[0].rank === currentCard.rank) {
              total.fourOfAKind.push(currentCard)
            } else if (total.fourOfAKind.length === 0 && total.extraCard !== null && currentCard.rank !== total.extraCard.rank) {
              total.fourOfAKind.push(currentCard)
            } else if (total.fourOfAKind.length === 0 && total.extraCard !== null && currentCard.rank === total.extraCard.rank) {
              total.fourOfAKind.push(currentCard, total.extraCard)
              total.extraCard = null
            }

            return total
          }

          const thisBreakdown: FourOfAKindBreakDown = this.cards.reduce(reduceFn, {
            fourOfAKind: [],
            extraCard: null
          })
          const handBreakdown: FourOfAKindBreakDown = hand.cards.reduce(reduceFn, {
            fourOfAKind: [],
            extraCard: null
          })
          return thisBreakdown.fourOfAKind[0].rank > handBreakdown.fourOfAKind[0].rank
        } else if (this.isFullHouse && hand.isFullHouse) {
          const getFullRank = (fullHouse: Card[]): Rank => {
            const ordered: Card[] = fullHouse.sort((a: Card, b: Card): number => {
              return b.rank - a.rank
            })
            let full: Rank = ordered[3].rank
            if (ordered[0].rank === ordered[2].rank) {
              full = ordered[0].rank
            }
            return full
          }
          const thisBreakdown: Rank = getFullRank(this.cards)
          const handBreakdown: Rank = getFullRank(hand.cards)
          return thisBreakdown > handBreakdown
        } else if (this.isFlush && hand.isFlush) {
          if (this.cards[0].suit === hand.cards[0].suit) {
            const greatestToLeast = (a: Card, b: Card) => {
              return b.rank - a.rank
            }
            const thisHighCard: Card = this.cards.sort(greatestToLeast)[0]
            const handHighCard: Card = hand.cards.sort(greatestToLeast)[0]
            return thisHighCard.beats(handHighCard)
          }
          return this.cards[0].suit > hand.cards[0].suit
        } else if (this.isStraight && hand.isStraight) {
          const greatestToLeast = (a: Card, b: Card) => {
            return b.rank - a.rank
          }
          const thisHighCard: Card = this.cards.sort(greatestToLeast)[0]
          const handHighCard: Card = hand.cards.sort(greatestToLeast)[0]
          return thisHighCard.beats(handHighCard)
        }
      }
      return this.fiveCardHandType > hand.fiveCardHandType
    }
  }

  public get numCards(): number {
    return this.cards.length
  }

  private checkIsDoubles(): boolean {
    if (this.numCards !== 2) {
      return false
    }

    return this.cards.every((card: Card) => {
      return card.rank === this.cards[0].rank
    })
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

    const hasEachCard: boolean = this.cards.every((card: Card) => {
      if (neededRanks.includes(card.rank)) {
        const indexToDelete: number = neededRanks.indexOf(card.rank)
        delete neededRanks[indexToDelete]
        return true
      }
      return false
    })

    return hasEachCard && (this.isFlush || this.checkIsFlush())
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

    const correctLengths: boolean = (group1.length === 4 && group2.length === 1) ||
      (group1.length === 1 && group2.length === 4)

    if (!correctLengths) {
      return false
    }

    let fourGroup = group1
    if (group2.length === 4) {
      fourGroup = group2
    }

    return fourGroup.every((card: Card) => {
      return card.rank === fourGroup[0].rank
    })
  }
}

export class InvalidHand extends CustomError {}
export class DuplicateCardError extends InvalidHand {}
export class InvalidNumberOfCards extends InvalidHand {}

export enum HandRank {
  STRAIGHT = 0,
  FLUSH = 1,
  FULL_HOUSE = 2,
  FOUR_OF_A_KIND = 3,
  STRAIGHT_FLUSH = 4,
  ROYAL_FLUSH = 5,
}

export default PusoyPlayedHand
