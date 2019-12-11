import {Card, Rank, Suit} from '../../Deck'
import PusoyPlayedHand from './PusoyPlayedHand'

describe('PusoyPlayedHand', () => {
  it('should fail to instantiate due to duplicate card', async () => {
    return expect(() => new PusoyPlayedHand([
      new Card(Suit.HEARTS, Rank.FOUR),
      new Card(Suit.HEARTS, Rank.EIGHT),
      new Card(Suit.HEARTS, Rank.EIGHT),
      new Card(Suit.HEARTS, Rank.SEVEN),
      new Card(Suit.HEARTS, Rank.SIX),
    ])).toThrow(new Error('Duplicate card detected'))
  })

  it('should fail to instantiate due to invalid number of cards', async () => {
    return expect(() => new PusoyPlayedHand([
      new Card(Suit.HEARTS, Rank.QUEEN),
      new Card(Suit.DIAMONDS, Rank.JACK),
      new Card(Suit.CLUBS, Rank.TEN),
    ])).toThrow(new Error('Invalid number of cards, must be 1, 2, or 5'))
  })

  it('should fail to instantiate due to invalid number of cards', async () => {
    return expect(() => new PusoyPlayedHand([]))
      .toThrow(new Error('Invalid number of cards, must be 1, 2, or 5'))
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
        new Card(Suit.HEARTS, Rank.EIGHT),
        new Card(Suit.SPADES, Rank.EIGHT),
        new Card(Suit.HEARTS, Rank.SEVEN),
        new Card(Suit.HEARTS, Rank.SIX),
      ])

      return expect(hand.isStraight).toBeFalsy()
    })

    it('should NOT be a straight', async () => {
      const hand = new PusoyPlayedHand([
        new Card(Suit.DIAMONDS, Rank.ACE),
        new Card(Suit.DIAMONDS, Rank.THREE),
        new Card(Suit.HEARTS, Rank.FOUR),
        new Card(Suit.DIAMONDS, Rank.FIVE),
        new Card(Suit.SPADES, Rank.TEN),
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
        new Card(Suit.HEARTS, Rank.ACE),
        new Card(Suit.DIAMONDS, Rank.THREE),
        new Card(Suit.DIAMONDS, Rank.FOUR),
        new Card(Suit.DIAMONDS, Rank.FIVE),
        new Card(Suit.DIAMONDS, Rank.TEN),
      ])

      return expect(hand.isFlush).toBeFalsy()
    })

    it('should NOT be a flush', async () => {
      const hand = new PusoyPlayedHand([
        new Card(Suit.SPADES, Rank.ACE),
        new Card(Suit.DIAMONDS, Rank.THREE),
        new Card(Suit.HEARTS, Rank.FOUR),
        new Card(Suit.DIAMONDS, Rank.FIVE),
        new Card(Suit.DIAMONDS, Rank.TEN),
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
        new Card(Suit.DIAMONDS, Rank.KING),
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

  describe('beats()', () => {
    it('should beat the hand', async () => {
      const hand = new PusoyPlayedHand([
        new Card(Suit.DIAMONDS, Rank.TWO),
        new Card(Suit.DIAMONDS, Rank.THREE),
        new Card(Suit.DIAMONDS, Rank.FOUR),
        new Card(Suit.DIAMONDS, Rank.SIX),
        new Card(Suit.DIAMONDS, Rank.KING),
      ])

      const otherHand = new PusoyPlayedHand([
        new Card(Suit.DIAMONDS, Rank.TEN),
        new Card(Suit.DIAMONDS, Rank.QUEEN),
        new Card(Suit.DIAMONDS, Rank.FIVE),
        new Card(Suit.DIAMONDS, Rank.JACK),
        new Card(Suit.DIAMONDS, Rank.ACE),
      ])

      return expect(otherHand.beats(hand)).toBeTruthy()
    })
  })
})
