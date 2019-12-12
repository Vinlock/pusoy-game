import {Card, Rank, Suit} from '../../Deck'
import PusoyPlayedHand, {InvalidHand, InvalidNumberOfCards} from './PusoyPlayedHand'

describe('PusoyPlayedHand', () => {
  it('should fail to instantiate due to duplicate card', async () => {
    return expect(() => new PusoyPlayedHand([
      new Card(Suit.HEARTS, Rank.FOUR),
      new Card(Suit.HEARTS, Rank.EIGHT),
      new Card(Suit.HEARTS, Rank.EIGHT),
      new Card(Suit.HEARTS, Rank.SEVEN),
      new Card(Suit.HEARTS, Rank.SIX),
    ])).toThrow(InvalidHand)
  })

  it('should fail to instantiate due to invalid number of cards', async () => {
    return expect(() => new PusoyPlayedHand([
      new Card(Suit.HEARTS, Rank.QUEEN),
      new Card(Suit.DIAMONDS, Rank.JACK),
      new Card(Suit.CLUBS, Rank.TEN),
    ])).toThrow(InvalidHand)
  })

  it('should fail to instantiate due to invalid number of cards', async () => {
    return expect(() => new PusoyPlayedHand([]))
      .toThrow(InvalidHand)
  })

  it('should fail to instantiate due to invalid set of cards', async () => {
    return expect(() => new PusoyPlayedHand([
      new Card(Suit.HEARTS, Rank.QUEEN),
      new Card(Suit.HEARTS, Rank.TWO),
      new Card(Suit.SPADES, Rank.FOUR),
      new Card(Suit.HEARTS, Rank.SIX),
      new Card(Suit.CLUBS, Rank.EIGHT),
    ])).toThrow(InvalidHand)
  })

  describe('get isStraight()', () => {
    it('should be a straight', async () => {
      const hand = new PusoyPlayedHand([
        new Card(Suit.HEARTS, Rank.FOUR),
        new Card(Suit.HEARTS, Rank.EIGHT),
        new Card(Suit.SPADES, Rank.FIVE),
        new Card(Suit.HEARTS, Rank.SEVEN),
        new Card(Suit.HEARTS, Rank.SIX),
      ])

      return expect(hand.isStraight).toBeTruthy()
    })

    it('should NOT be a straight', async () => {
      const hand = new PusoyPlayedHand([
        new Card(Suit.HEARTS, Rank.FOUR),
        new Card(Suit.HEARTS, Rank.FIVE),
        new Card(Suit.HEARTS, Rank.NINE),
        new Card(Suit.HEARTS, Rank.SEVEN),
        new Card(Suit.HEARTS, Rank.SIX),
      ])

      return expect(hand.isStraight).toBeFalsy()
    })

    it('should NOT be a straight', async () => {
      const hand = new PusoyPlayedHand([
        new Card(Suit.DIAMONDS, Rank.ACE),
        new Card(Suit.DIAMONDS, Rank.THREE),
        new Card(Suit.DIAMONDS, Rank.FOUR),
        new Card(Suit.DIAMONDS, Rank.FIVE),
        new Card(Suit.DIAMONDS, Rank.TEN),
      ])

      return expect(hand.isStraight).toBeFalsy()
    })
  })

  describe('get isFlush()', () => {
    it('should be a flush', async () => {
      const hand = new PusoyPlayedHand([
        new Card(Suit.DIAMONDS, Rank.ACE),
        new Card(Suit.DIAMONDS, Rank.THREE),
        new Card(Suit.DIAMONDS, Rank.FOUR),
        new Card(Suit.DIAMONDS, Rank.FIVE),
        new Card(Suit.DIAMONDS, Rank.TEN),
      ])

      return expect(hand.isFlush).toBeTruthy()
    })

    it('should NOT be a flush', async () => {
      const hand = new PusoyPlayedHand([
        new Card(Suit.HEARTS, Rank.FOUR),
        new Card(Suit.DIAMONDS, Rank.THREE),
        new Card(Suit.DIAMONDS, Rank.FIVE),
        new Card(Suit.DIAMONDS, Rank.SIX),
        new Card(Suit.DIAMONDS, Rank.SEVEN),
      ])

      return expect(hand.isFlush).toBeFalsy()
    })
  })

  describe('get isStraightFlush()', () => {
    it('should be a straight flush', async () => {
      const hand = new PusoyPlayedHand([
        new Card(Suit.DIAMONDS, Rank.SEVEN),
        new Card(Suit.DIAMONDS, Rank.THREE),
        new Card(Suit.DIAMONDS, Rank.FOUR),
        new Card(Suit.DIAMONDS, Rank.FIVE),
        new Card(Suit.DIAMONDS, Rank.SIX),
      ])

      return expect(hand.isStraightFlush).toBeTruthy()
    })
    
    it('should NOT be a straight flush', async () => {
      const hand = new PusoyPlayedHand([
        new Card(Suit.DIAMONDS, Rank.SEVEN),
        new Card(Suit.HEARTS, Rank.THREE),
        new Card(Suit.DIAMONDS, Rank.FOUR),
        new Card(Suit.DIAMONDS, Rank.FIVE),
        new Card(Suit.DIAMONDS, Rank.SIX),
      ])

      return expect(hand.isStraightFlush).toBeFalsy()
    })
  })

  describe('get isRoyalFlush()', () => {
    it('should be a royal flush', async () => {
      const hand = new PusoyPlayedHand([
        new Card(Suit.DIAMONDS, Rank.TEN),
        new Card(Suit.DIAMONDS, Rank.JACK),
        new Card(Suit.DIAMONDS, Rank.QUEEN),
        new Card(Suit.DIAMONDS, Rank.KING),
        new Card(Suit.DIAMONDS, Rank.ACE),
      ])

      return expect(hand.isRoyalFlush).toBeTruthy()
    })

    it('should NOT be a royal flush', async () => {
      const hand = new PusoyPlayedHand([
        new Card(Suit.HEARTS, Rank.TEN),
        new Card(Suit.DIAMONDS, Rank.JACK),
        new Card(Suit.DIAMONDS, Rank.QUEEN),
        new Card(Suit.DIAMONDS, Rank.KING),
        new Card(Suit.DIAMONDS, Rank.ACE),
      ])

      return expect(hand.isRoyalFlush).toBeFalsy()
    })

    it('should NOT be a royal flush', async () => {
      const hand = new PusoyPlayedHand([
        new Card(Suit.DIAMONDS, Rank.NINE),
        new Card(Suit.DIAMONDS, Rank.JACK),
        new Card(Suit.DIAMONDS, Rank.QUEEN),
        new Card(Suit.DIAMONDS, Rank.KING),
        new Card(Suit.DIAMONDS, Rank.ACE),
      ])

      return expect(hand.isRoyalFlush).toBeFalsy()
    })
  })

  describe('get isFullHouse()', () => {
    it('should be a full house', async () => {
      const hand = new PusoyPlayedHand([
        new Card(Suit.DIAMONDS, Rank.NINE),
        new Card(Suit.HEARTS, Rank.NINE),
        new Card(Suit.SPADES, Rank.NINE),
        new Card(Suit.DIAMONDS, Rank.KING),
        new Card(Suit.CLUBS, Rank.KING),
      ])

      return expect(hand.isFullHouse).toBeTruthy()
    })

    it('should NOT be a full house', async () => {
      const hand = new PusoyPlayedHand([
        new Card(Suit.DIAMONDS, Rank.NINE),
        new Card(Suit.HEARTS, Rank.NINE),
        new Card(Suit.SPADES, Rank.NINE),
        new Card(Suit.CLUBS, Rank.NINE),
        new Card(Suit.CLUBS, Rank.QUEEN),
      ])

      return expect(hand.isFullHouse).toBeFalsy()
    })
  })

  describe('get isFourOfAKind()', () => {
    it('should be a four of a kind', async () => {
      const hand = new PusoyPlayedHand([
        new Card(Suit.DIAMONDS, Rank.NINE),
        new Card(Suit.HEARTS, Rank.NINE),
        new Card(Suit.SPADES, Rank.NINE),
        new Card(Suit.CLUBS, Rank.NINE),
        new Card(Suit.CLUBS, Rank.KING),
      ])

      return expect(hand.isFourOfAKind).toBeTruthy()
    })

    it('should NOT be a four of a kind', async () => {
      const hand = new PusoyPlayedHand([
        new Card(Suit.DIAMONDS, Rank.NINE),
        new Card(Suit.HEARTS, Rank.NINE),
        new Card(Suit.SPADES, Rank.NINE),
        new Card(Suit.DIAMONDS, Rank.KING),
        new Card(Suit.CLUBS, Rank.KING),
      ])

      return expect(hand.isFourOfAKind).toBeFalsy()
    })
  })

  describe('isDoubles', () => {
    it('should be a doubles hand', async () => {
      const hand = new PusoyPlayedHand([
        new Card(Suit.DIAMONDS, Rank.QUEEN),
        new Card(Suit.SPADES, Rank.QUEEN),
      ])

      return expect(hand.isDoubles).toBeTruthy()
    })

    it('should NOT be a doubles hand', async () => {
      const hand = new PusoyPlayedHand([
        new Card(Suit.SPADES, Rank.TEN),
      ])

      return expect(hand.isDoubles).toBeFalsy()
    })
  })

  describe('beats()', () => {
    it('should fail due to comparing two hands of different numCards', async () => {
      const doublesHand = new PusoyPlayedHand([
        new Card(Suit.DIAMONDS, Rank.SEVEN),
        new Card(Suit.SPADES, Rank.SEVEN),
      ])

      const fullHouse = new PusoyPlayedHand([
        new Card(Suit.DIAMONDS, Rank.THREE),
        new Card(Suit.SPADES, Rank.THREE),
        new Card(Suit.CLUBS, Rank.THREE),
        new Card(Suit.SPADES, Rank.FOUR),
        new Card(Suit.DIAMONDS, Rank.FOUR),
      ])

      return expect(() => doublesHand.beats(fullHouse))
        .toThrow(InvalidNumberOfCards)
    })

    describe('royal flush', () => {
      it('should beat the lower suit royal flush with the higher suit royal flush (DIAMONDS vs SPADES)', async () => {
        const higherSuitRoyalFlush = new PusoyPlayedHand([
          new Card(Suit.DIAMONDS, Rank.TEN),
          new Card(Suit.DIAMONDS, Rank.QUEEN),
          new Card(Suit.DIAMONDS, Rank.KING),
          new Card(Suit.DIAMONDS, Rank.JACK),
          new Card(Suit.DIAMONDS, Rank.ACE),
        ])

        const lowerSuitRoyalFlush = new PusoyPlayedHand([
          new Card(Suit.SPADES, Rank.TEN),
          new Card(Suit.SPADES, Rank.QUEEN),
          new Card(Suit.SPADES, Rank.KING),
          new Card(Suit.SPADES, Rank.JACK),
          new Card(Suit.SPADES, Rank.ACE),
        ])

        return expect(higherSuitRoyalFlush.beats(lowerSuitRoyalFlush)).toBeTruthy()
      })

      it('should beat the lower suit royal flush with the higher suit royal flush (DIAMONDS vs HEARTS)', async () => {
        const higherSuitRoyalFlush = new PusoyPlayedHand([
          new Card(Suit.DIAMONDS, Rank.TEN),
          new Card(Suit.DIAMONDS, Rank.QUEEN),
          new Card(Suit.DIAMONDS, Rank.KING),
          new Card(Suit.DIAMONDS, Rank.JACK),
          new Card(Suit.DIAMONDS, Rank.ACE),
        ])

        const lowerSuitRoyalFlush = new PusoyPlayedHand([
          new Card(Suit.HEARTS, Rank.TEN),
          new Card(Suit.HEARTS, Rank.QUEEN),
          new Card(Suit.HEARTS, Rank.KING),
          new Card(Suit.HEARTS, Rank.JACK),
          new Card(Suit.HEARTS, Rank.ACE),
        ])

        return expect(higherSuitRoyalFlush.beats(lowerSuitRoyalFlush)).toBeTruthy()
      })

      it('should beat the lower suit royal flush with the higher suit royal flush (DIAMONDS vs CLUBS)', async () => {
        const higherSuitRoyalFlush = new PusoyPlayedHand([
          new Card(Suit.DIAMONDS, Rank.TEN),
          new Card(Suit.DIAMONDS, Rank.QUEEN),
          new Card(Suit.DIAMONDS, Rank.KING),
          new Card(Suit.DIAMONDS, Rank.JACK),
          new Card(Suit.DIAMONDS, Rank.ACE),
        ])

        const lowerSuitRoyalFlush = new PusoyPlayedHand([
          new Card(Suit.CLUBS, Rank.TEN),
          new Card(Suit.CLUBS, Rank.QUEEN),
          new Card(Suit.CLUBS, Rank.KING),
          new Card(Suit.CLUBS, Rank.JACK),
          new Card(Suit.CLUBS, Rank.ACE),
        ])

        return expect(higherSuitRoyalFlush.beats(lowerSuitRoyalFlush)).toBeTruthy()
      })

      it('should beat the lower suit royal flush with the higher suit royal flush (HEARTS vs SPADES)', async () => {
        const higherSuitRoyalFlush = new PusoyPlayedHand([
          new Card(Suit.HEARTS, Rank.TEN),
          new Card(Suit.HEARTS, Rank.QUEEN),
          new Card(Suit.HEARTS, Rank.KING),
          new Card(Suit.HEARTS, Rank.JACK),
          new Card(Suit.HEARTS, Rank.ACE),
        ])

        const lowerSuitRoyalFlush = new PusoyPlayedHand([
          new Card(Suit.SPADES, Rank.TEN),
          new Card(Suit.SPADES, Rank.QUEEN),
          new Card(Suit.SPADES, Rank.KING),
          new Card(Suit.SPADES, Rank.JACK),
          new Card(Suit.SPADES, Rank.ACE),
        ])

        return expect(higherSuitRoyalFlush.beats(lowerSuitRoyalFlush)).toBeTruthy()
      })

      it('should beat the lower suit royal flush with the higher suit royal flush (HEARTS vs CLUBS)', async () => {
        const higherSuitRoyalFlush = new PusoyPlayedHand([
          new Card(Suit.HEARTS, Rank.TEN),
          new Card(Suit.HEARTS, Rank.QUEEN),
          new Card(Suit.HEARTS, Rank.KING),
          new Card(Suit.HEARTS, Rank.JACK),
          new Card(Suit.HEARTS, Rank.ACE),
        ])

        const lowerSuitRoyalFlush = new PusoyPlayedHand([
          new Card(Suit.CLUBS, Rank.TEN),
          new Card(Suit.CLUBS, Rank.QUEEN),
          new Card(Suit.CLUBS, Rank.KING),
          new Card(Suit.CLUBS, Rank.JACK),
          new Card(Suit.CLUBS, Rank.ACE),
        ])

        return expect(higherSuitRoyalFlush.beats(lowerSuitRoyalFlush)).toBeTruthy()
      })

      it('should beat the lower suit royal flush with the higher suit royal flush (SPADES vs CLUBS)', async () => {
        const higherSuitRoyalFlush = new PusoyPlayedHand([
          new Card(Suit.SPADES, Rank.TEN),
          new Card(Suit.SPADES, Rank.QUEEN),
          new Card(Suit.SPADES, Rank.FIVE),
          new Card(Suit.SPADES, Rank.JACK),
          new Card(Suit.SPADES, Rank.ACE),
        ])

        const lowerSuitRoyalFlush = new PusoyPlayedHand([
          new Card(Suit.CLUBS, Rank.TEN),
          new Card(Suit.CLUBS, Rank.QUEEN),
          new Card(Suit.CLUBS, Rank.FIVE),
          new Card(Suit.CLUBS, Rank.JACK),
          new Card(Suit.CLUBS, Rank.ACE),
        ])

        return expect(higherSuitRoyalFlush.beats(lowerSuitRoyalFlush)).toBeTruthy()
      })
    })

    describe('flush', () => {
      it('should beat the lowerFlush (DIAMONDS vs DIAMONDS) HIGH CARD', async () => {
        const higherFlush = new PusoyPlayedHand([
          new Card(Suit.DIAMONDS, Rank.TWO),
          new Card(Suit.DIAMONDS, Rank.THREE),
          new Card(Suit.DIAMONDS, Rank.FOUR),
          new Card(Suit.DIAMONDS, Rank.SIX),
          new Card(Suit.DIAMONDS, Rank.KING),
        ])

        const lowerFlush = new PusoyPlayedHand([
          new Card(Suit.DIAMONDS, Rank.TEN),
          new Card(Suit.DIAMONDS, Rank.QUEEN),
          new Card(Suit.DIAMONDS, Rank.FIVE),
          new Card(Suit.DIAMONDS, Rank.JACK),
          new Card(Suit.DIAMONDS, Rank.ACE),
        ])

        return expect(higherFlush.beats(lowerFlush)).toBeTruthy()
      })

      it('should beat the lowerFlush (DIAMONDS vs HEARTS)', async () => {
        const higherFlush = new PusoyPlayedHand([
          new Card(Suit.DIAMONDS, Rank.TWO),
          new Card(Suit.DIAMONDS, Rank.THREE),
          new Card(Suit.DIAMONDS, Rank.FOUR),
          new Card(Suit.DIAMONDS, Rank.SIX),
          new Card(Suit.DIAMONDS, Rank.KING),
        ])

        const lowerFlush = new PusoyPlayedHand([
          new Card(Suit.HEARTS, Rank.TEN),
          new Card(Suit.HEARTS, Rank.QUEEN),
          new Card(Suit.HEARTS, Rank.FIVE),
          new Card(Suit.HEARTS, Rank.JACK),
          new Card(Suit.HEARTS, Rank.ACE),
        ])

        return expect(higherFlush.beats(lowerFlush)).toBeTruthy()
      })

      it('should beat the lowerFlush (DIAMONDS vs SPADES)', async () => {
        const higherFlush = new PusoyPlayedHand([
          new Card(Suit.DIAMONDS, Rank.TWO),
          new Card(Suit.DIAMONDS, Rank.THREE),
          new Card(Suit.DIAMONDS, Rank.FOUR),
          new Card(Suit.DIAMONDS, Rank.SIX),
          new Card(Suit.DIAMONDS, Rank.KING),
        ])

        const lowerFlush = new PusoyPlayedHand([
          new Card(Suit.SPADES, Rank.TEN),
          new Card(Suit.SPADES, Rank.QUEEN),
          new Card(Suit.SPADES, Rank.FIVE),
          new Card(Suit.SPADES, Rank.JACK),
          new Card(Suit.SPADES, Rank.ACE),
        ])

        return expect(higherFlush.beats(lowerFlush)).toBeTruthy()
      })

      it('should beat the lowerFlush (DIAMONDS vs CLUBS)', async () => {
        const higherFlush = new PusoyPlayedHand([
          new Card(Suit.DIAMONDS, Rank.TWO),
          new Card(Suit.DIAMONDS, Rank.THREE),
          new Card(Suit.DIAMONDS, Rank.FOUR),
          new Card(Suit.DIAMONDS, Rank.SIX),
          new Card(Suit.DIAMONDS, Rank.KING),
        ])

        const lowerFlush = new PusoyPlayedHand([
          new Card(Suit.CLUBS, Rank.TEN),
          new Card(Suit.CLUBS, Rank.QUEEN),
          new Card(Suit.CLUBS, Rank.FIVE),
          new Card(Suit.CLUBS, Rank.JACK),
          new Card(Suit.CLUBS, Rank.ACE),
        ])

        return expect(higherFlush.beats(lowerFlush)).toBeTruthy()
      })

      it('should beat the lowerFlush (HEARTS vs SPADES)', async () => {
        const higherFlush = new PusoyPlayedHand([
          new Card(Suit.HEARTS, Rank.TWO),
          new Card(Suit.HEARTS, Rank.THREE),
          new Card(Suit.HEARTS, Rank.FOUR),
          new Card(Suit.HEARTS, Rank.SIX),
          new Card(Suit.HEARTS, Rank.KING),
        ])

        const lowerFlush = new PusoyPlayedHand([
          new Card(Suit.SPADES, Rank.TEN),
          new Card(Suit.SPADES, Rank.QUEEN),
          new Card(Suit.SPADES, Rank.FIVE),
          new Card(Suit.SPADES, Rank.JACK),
          new Card(Suit.SPADES, Rank.ACE),
        ])

        return expect(higherFlush.beats(lowerFlush)).toBeTruthy()
      })

      it('should beat the lowerFlush (HEARTS vs CLUBS)', async () => {
        const higherFlush = new PusoyPlayedHand([
          new Card(Suit.HEARTS, Rank.TWO),
          new Card(Suit.HEARTS, Rank.THREE),
          new Card(Suit.HEARTS, Rank.FOUR),
          new Card(Suit.HEARTS, Rank.SIX),
          new Card(Suit.HEARTS, Rank.KING),
        ])

        const lowerFlush = new PusoyPlayedHand([
          new Card(Suit.CLUBS, Rank.TEN),
          new Card(Suit.CLUBS, Rank.QUEEN),
          new Card(Suit.CLUBS, Rank.FIVE),
          new Card(Suit.CLUBS, Rank.JACK),
          new Card(Suit.CLUBS, Rank.ACE),
        ])

        return expect(higherFlush.beats(lowerFlush)).toBeTruthy()
      })

      it('should beat the lowerFlush (SPADES vs CLUBS)', async () => {
        const higherFlush = new PusoyPlayedHand([
          new Card(Suit.SPADES, Rank.TWO),
          new Card(Suit.SPADES, Rank.THREE),
          new Card(Suit.SPADES, Rank.FOUR),
          new Card(Suit.SPADES, Rank.SIX),
          new Card(Suit.SPADES, Rank.KING),
        ])

        const lowerFlush = new PusoyPlayedHand([
          new Card(Suit.CLUBS, Rank.TEN),
          new Card(Suit.CLUBS, Rank.QUEEN),
          new Card(Suit.CLUBS, Rank.FIVE),
          new Card(Suit.CLUBS, Rank.JACK),
          new Card(Suit.CLUBS, Rank.ACE),
        ])

        return expect(higherFlush.beats(lowerFlush)).toBeTruthy()
      })
    })

    describe('straight', () => {
      it('should beat the lowerStraight with the higherStraight (high suit)', async () => {
        const lowerStraight = new PusoyPlayedHand([
          new Card(Suit.DIAMONDS, Rank.THREE),
          new Card(Suit.SPADES, Rank.FOUR),
          new Card(Suit.SPADES, Rank.FIVE),
          new Card(Suit.CLUBS, Rank.SIX),
          new Card(Suit.CLUBS, Rank.SEVEN),
        ])

        const higherStraight = new PusoyPlayedHand([
          new Card(Suit.SPADES, Rank.THREE),
          new Card(Suit.CLUBS, Rank.FOUR),
          new Card(Suit.CLUBS, Rank.FIVE),
          new Card(Suit.SPADES, Rank.SIX),
          new Card(Suit.DIAMONDS, Rank.SEVEN),
        ])

        return expect(higherStraight.beats(lowerStraight)).toBeTruthy()
      })

      it('should beat the lowerStraight with the higherStraight (high rank)', async () => {
        const lowerStraight = new PusoyPlayedHand([
          new Card(Suit.DIAMONDS, Rank.THREE),
          new Card(Suit.SPADES, Rank.FOUR),
          new Card(Suit.SPADES, Rank.FIVE),
          new Card(Suit.CLUBS, Rank.SIX),
          new Card(Suit.CLUBS, Rank.SEVEN),
        ])

        const higherStraight = new PusoyPlayedHand([
          new Card(Suit.SPADES, Rank.FOUR),
          new Card(Suit.CLUBS, Rank.FIVE),
          new Card(Suit.CLUBS, Rank.SIX),
          new Card(Suit.SPADES, Rank.SEVEN),
          new Card(Suit.DIAMONDS, Rank.EIGHT),
        ])

        return expect(higherStraight.beats(lowerStraight)).toBeTruthy()
      })
    })

    describe('straight flush', () => {
      it('should beat the lowerStraightFlush with the higherStraightFlush (DIAMONDS - HIGH CARD)', async () => {
        const lowerStraightFlush = new PusoyPlayedHand([
          new Card(Suit.DIAMONDS, Rank.THREE),
          new Card(Suit.DIAMONDS, Rank.FOUR),
          new Card(Suit.DIAMONDS, Rank.FIVE),
          new Card(Suit.DIAMONDS, Rank.SIX),
          new Card(Suit.DIAMONDS, Rank.SEVEN),
        ])

        const higherStraightFlush = new PusoyPlayedHand([
          new Card(Suit.DIAMONDS, Rank.EIGHT),
          new Card(Suit.DIAMONDS, Rank.NINE),
          new Card(Suit.DIAMONDS, Rank.TEN),
          new Card(Suit.DIAMONDS, Rank.JACK),
          new Card(Suit.DIAMONDS, Rank.QUEEN),
        ])

        return expect(higherStraightFlush.beats(lowerStraightFlush)).toBeTruthy()
      })

      it('should beat the lowerStraightFlush with the higherStraightFlush (HEARTS - HIGH CARD)', async () => {
        const lowerStraightFlush = new PusoyPlayedHand([
          new Card(Suit.HEARTS, Rank.THREE),
          new Card(Suit.HEARTS, Rank.FOUR),
          new Card(Suit.HEARTS, Rank.FIVE),
          new Card(Suit.HEARTS, Rank.SIX),
          new Card(Suit.HEARTS, Rank.SEVEN),
        ])

        const higherStraightFlush = new PusoyPlayedHand([
          new Card(Suit.HEARTS, Rank.EIGHT),
          new Card(Suit.HEARTS, Rank.NINE),
          new Card(Suit.HEARTS, Rank.TEN),
          new Card(Suit.HEARTS, Rank.JACK),
          new Card(Suit.HEARTS, Rank.QUEEN),
        ])

        return expect(higherStraightFlush.beats(lowerStraightFlush)).toBeTruthy()
      })

      it('should beat the lowerStraightFlush with the higherStraightFlush (SPADES - HIGH CARD)', async () => {
        const lowerStraightFlush = new PusoyPlayedHand([
          new Card(Suit.SPADES, Rank.THREE),
          new Card(Suit.SPADES, Rank.FOUR),
          new Card(Suit.SPADES, Rank.FIVE),
          new Card(Suit.SPADES, Rank.SIX),
          new Card(Suit.SPADES, Rank.SEVEN),
        ])

        const higherStraightFlush = new PusoyPlayedHand([
          new Card(Suit.SPADES, Rank.EIGHT),
          new Card(Suit.SPADES, Rank.NINE),
          new Card(Suit.SPADES, Rank.TEN),
          new Card(Suit.SPADES, Rank.JACK),
          new Card(Suit.SPADES, Rank.QUEEN),
        ])

        return expect(higherStraightFlush.beats(lowerStraightFlush)).toBeTruthy()
      })

      it('should beat the lowerStraightFlush with the higherStraightFlush (CLUBS - HIGH CARD)', async () => {
        const lowerStraightFlush = new PusoyPlayedHand([
          new Card(Suit.CLUBS, Rank.THREE),
          new Card(Suit.CLUBS, Rank.FOUR),
          new Card(Suit.CLUBS, Rank.FIVE),
          new Card(Suit.CLUBS, Rank.SIX),
          new Card(Suit.CLUBS, Rank.SEVEN),
        ])

        const higherStraightFlush = new PusoyPlayedHand([
          new Card(Suit.CLUBS, Rank.EIGHT),
          new Card(Suit.CLUBS, Rank.NINE),
          new Card(Suit.CLUBS, Rank.TEN),
          new Card(Suit.CLUBS, Rank.JACK),
          new Card(Suit.CLUBS, Rank.QUEEN),
        ])

        return expect(higherStraightFlush.beats(lowerStraightFlush)).toBeTruthy()
      })

      it('should be the lowerStraightFlush with the higherStraightFlush (high suit)', async () => {
        const lowerStraightFlush = new PusoyPlayedHand([
          new Card(Suit.CLUBS, Rank.TEN),
          new Card(Suit.CLUBS, Rank.NINE),
          new Card(Suit.CLUBS, Rank.EIGHT),
          new Card(Suit.CLUBS, Rank.SEVEN),
          new Card(Suit.CLUBS, Rank.SIX),
        ])

        const highStraightFlush = new PusoyPlayedHand([
          new Card(Suit.SPADES, Rank.TEN),
          new Card(Suit.SPADES, Rank.NINE),
          new Card(Suit.SPADES, Rank.EIGHT),
          new Card(Suit.SPADES, Rank.SEVEN),
          new Card(Suit.SPADES, Rank.SIX),
        ])

        return expect(highStraightFlush.beats(lowerStraightFlush)).toBeTruthy()
      })
    })

    describe('four of a kind', () => {
      it('should beat the lowerFourOfAKind with the higherFourOfAKind', async () => {
        const lowerFourOfAKind = new PusoyPlayedHand([
          new Card(Suit.DIAMONDS, Rank.EIGHT),
          new Card(Suit.SPADES, Rank.EIGHT),
          new Card(Suit.CLUBS, Rank.EIGHT),
          new Card(Suit.HEARTS, Rank.EIGHT),
          new Card(Suit.SPADES, Rank.JACK),
        ])

        const higherFourOfAKind = new PusoyPlayedHand([
          new Card(Suit.HEARTS, Rank.JACK),
          new Card(Suit.DIAMONDS, Rank.JACK),
          new Card(Suit.SPADES, Rank.JACK),
          new Card(Suit.CLUBS, Rank.JACK),
          new Card(Suit.SPADES, Rank.THREE),
        ])

        return expect(higherFourOfAKind.beats(lowerFourOfAKind)).toBeTruthy()
      })
    })

    describe('full house', () => {
      it('should beat the lowerFullHouse with the higherFullHouse', async () => {
        const lowerFullHouse = new PusoyPlayedHand([
          new Card(Suit.DIAMONDS, Rank.FOUR),
          new Card(Suit.SPADES, Rank.FOUR),
          new Card(Suit.DIAMONDS, Rank.TEN),
          new Card(Suit.CLUBS, Rank.TEN),
          new Card(Suit.HEARTS, Rank.TEN),
        ])

        const higherFullHouse = new PusoyPlayedHand([
          new Card(Suit.DIAMONDS, Rank.KING),
          new Card(Suit.SPADES, Rank.KING),
          new Card(Suit.HEARTS, Rank.KING),
          new Card(Suit.SPADES, Rank.FOUR),
          new Card(Suit.DIAMONDS, Rank.FOUR),
        ])

        return expect(higherFullHouse.beats(lowerFullHouse)).toBeTruthy()
      })
    })

    describe('doubles', () => {
      it('should beat the lowerDoubles with the higherDoubles (rank based)', async () => {
        const lowerDoubles = new PusoyPlayedHand([
          new Card(Suit.DIAMONDS, Rank.FIVE),
          new Card(Suit.SPADES, Rank.FIVE),
        ])

        const higherDoubles = new PusoyPlayedHand([
          new Card(Suit.DIAMONDS, Rank.SIX),
          new Card(Suit.CLUBS, Rank.SIX),
        ])

        return expect(higherDoubles.beats(lowerDoubles)).toBeTruthy()
      })

      it('should beat the lowerDoubles with the higherDoubles (suit based)', async () => {
        const lowerDoubles = new PusoyPlayedHand([
          new Card(Suit.SPADES, Rank.FOUR),
          new Card(Suit.HEARTS, Rank.FOUR),
        ])

        const higherDoubles = new PusoyPlayedHand([
          new Card(Suit.DIAMONDS, Rank.FOUR),
          new Card(Suit.CLUBS, Rank.FOUR),
        ])

        return expect(higherDoubles.beats(lowerDoubles)).toBeTruthy()
      })
    })

    describe('singles', () => {
      it('should beat the lowerSingle with the higherSingle (rank based)', async () => {
        const lowerSingle = new PusoyPlayedHand([
          new Card(Suit.HEARTS, Rank.FOUR),
        ])

        const higherSingle = new PusoyPlayedHand([
          new Card(Suit.DIAMONDS, Rank.FIVE),
        ])

        return expect(higherSingle.beats(lowerSingle)).toBeTruthy()
      })

      it('should beat the lowerSingle with the higherSingle (suit based)', async () => {
        const lowerSingle = new PusoyPlayedHand([
          new Card(Suit.CLUBS, Rank.TEN),
        ])

        const higherSingle = new PusoyPlayedHand([
          new Card(Suit.SPADES, Rank.TEN),
        ])

        return expect(higherSingle.beats(lowerSingle)).toBeTruthy()
      })
    })

    it('should beat the straight flush with the royal flush', async () => {
      const royalFlush = new PusoyPlayedHand([
        new Card(Suit.DIAMONDS, Rank.TEN),
        new Card(Suit.DIAMONDS, Rank.JACK),
        new Card(Suit.DIAMONDS, Rank.QUEEN),
        new Card(Suit.DIAMONDS, Rank.KING),
        new Card(Suit.DIAMONDS, Rank.ACE),
      ])

      const straightFlush = new PusoyPlayedHand([
        new Card(Suit.CLUBS, Rank.FIVE),
        new Card(Suit.CLUBS, Rank.SIX),
        new Card(Suit.CLUBS, Rank.SEVEN),
        new Card(Suit.CLUBS, Rank.EIGHT),
        new Card(Suit.CLUBS, Rank.NINE),
      ])

      return expect(royalFlush.beats(straightFlush)).toBeTruthy()
    })
  })
})
