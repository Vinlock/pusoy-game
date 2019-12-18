import PusoyPile from './PusoyPile'
import { Card, Rank, Suit } from '../Deck'
import PusoyPlayedHand from './PusoyPlayedHand'

describe('PusoyPile', () => {
  it ('should play hand', async () => {
    const hand = [
      new Card(Suit.DIAMONDS, Rank.FIVE),
      new Card(Suit.DIAMONDS, Rank.SIX),
      new Card(Suit.DIAMONDS, Rank.SEVEN),
      new Card(Suit.DIAMONDS, Rank.EIGHT),
      new Card(Suit.DIAMONDS, Rank.NINE),
    ]

    const pile = new PusoyPile()
    const playableHand = new PusoyPlayedHand(hand)
    const handIsPlayed = pile.playHand(playableHand)
    return expect(handIsPlayed).toBeTruthy()
  })

  it('should beat last hand', async () => {
    const hand = new PusoyPlayedHand([
      new Card(Suit.DIAMONDS, Rank.FIVE),
      new Card(Suit.DIAMONDS, Rank.SIX),
      new Card(Suit.DIAMONDS, Rank.SEVEN),
      new Card(Suit.DIAMONDS, Rank.EIGHT),
      new Card(Suit.DIAMONDS, Rank.NINE),
    ])

    const betterHand = new PusoyPlayedHand([
      new Card(Suit.DIAMONDS, Rank.SIX),
      new Card(Suit.DIAMONDS, Rank.SEVEN),
      new Card(Suit.DIAMONDS, Rank.EIGHT),
      new Card(Suit.DIAMONDS, Rank.NINE),
      new Card(Suit.DIAMONDS, Rank.TEN),
    ])

    const pile = new PusoyPile()
    const firstHandIsPlayed = pile.playHand(hand)
    expect(firstHandIsPlayed).toBeTruthy()

    const secondHandWins = pile.playHand(betterHand)
    return expect(secondHandWins).toBeTruthy()
  })
})
