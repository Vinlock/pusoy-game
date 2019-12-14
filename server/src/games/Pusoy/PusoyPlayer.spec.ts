import PusoyPlayer from './PusoyPlayer'
import {Card, Rank, Suit} from '../../Deck'
import PusoyPlayedHand from './PusoyPlayedHand'

describe('PusoyPlayer', () => {
  it('should instantiate the player with given hand and be able to play it', async () => {
    const hand = [
      new Card(Suit.DIAMONDS, Rank.SIX),
      new Card(Suit.DIAMONDS, Rank.SEVEN),
      new Card(Suit.DIAMONDS, Rank.EIGHT),
      new Card(Suit.DIAMONDS, Rank.NINE),
      new Card(Suit.DIAMONDS, Rank.TEN),
    ]

    const player = new PusoyPlayer(0, hand)
    return expect(player.canPlayHand(new PusoyPlayedHand(hand))).toBeTruthy()
  })

  it('should instantiate the player with given hand and play it', async () => {
    const hand = [
      new Card(Suit.DIAMONDS, Rank.SIX),
      new Card(Suit.DIAMONDS, Rank.SEVEN),
      new Card(Suit.DIAMONDS, Rank.EIGHT),
      new Card(Suit.DIAMONDS, Rank.NINE),
      new Card(Suit.DIAMONDS, Rank.TEN),
    ]

    const player = new PusoyPlayer(0, hand)
    return expect(player.playHand(new PusoyPlayedHand(hand))).toBeTruthy()
  })

  it('should instantiate the player with given hand and play it', async () => {
    const playHand = [
      new Card(Suit.DIAMONDS, Rank.SIX),
      new Card(Suit.DIAMONDS, Rank.SEVEN),
      new Card(Suit.DIAMONDS, Rank.EIGHT),
      new Card(Suit.DIAMONDS, Rank.NINE),
      new Card(Suit.DIAMONDS, Rank.TEN),
    ]

    const startingHand = [
      new Card(Suit.DIAMONDS, Rank.SIX),
      new Card(Suit.DIAMONDS, Rank.SEVEN),
      new Card(Suit.DIAMONDS, Rank.EIGHT),
      new Card(Suit.DIAMONDS, Rank.NINE),
    ]

    const player = new PusoyPlayer(0, startingHand)
    return expect(player.playHand(new PusoyPlayedHand(playHand))).toBeFalsy()
  })

  it('should add a card to hand', async () => {
    const card = new Card(Suit.DIAMONDS, Rank.SIX)
    const player = new PusoyPlayer(0)
    player.addCardToHand(card)
    return expect(player.cardsInHand.find((c: Card) => {
      return card.is(c)
    })).toBeTruthy()
  })
})
