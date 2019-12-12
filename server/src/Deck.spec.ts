import Deck, { allRanks, allSuits, Card, Rank, Suit } from './Deck'

describe('Deck', () => {
  describe('static getAllCards()', () => {
    it('should have 52 cards (without jokers)', async () => {
      const allCards: Card[] = Deck.getAllCards()
      return expect(allCards).toHaveLength(52)
    })

    it('should have 54 cards (with jokers)', async () => {
      const allCards: Card[] = Deck.getAllCards(true)
      return expect(allCards).toHaveLength(54)
    })
  })

  it('should create a deck of 52 cards (without jokers)', async () => {
    const deck = new Deck()
    return expect(deck.numCards).toEqual(52)
  })

  it('should create a deck of 54 cards (with jokers)', async () => {
    const deck = new Deck(true)
    return expect(deck.numCards).toEqual(54)
  })

  it('should shuffle the deck and have every card still (without jokers)', async () => {
    let allCards: Card[] = Deck.getAllCards()

    const deck = new Deck()
    deck.shuffle()
    deck.getCards().forEach((card: Card) => {
      allCards = allCards.filter((c: Card) => {
        return !c.is(card)
      })
    })

    return expect(allCards).toHaveLength(0)
  })

  it('should shuffle the deck and have every card still (with jokers)', async () => {
    let allCards: Card[] = Deck.getAllCards(true)

    const deck = new Deck(true)
    deck.shuffle()
    deck.getCards().forEach((card: Card) => {
      allCards = allCards.filter((c: Card) => {
        return !c.is(card)
      })
    })

    return expect(allCards).toHaveLength(0)
  })

  it('should deal a card', async () => {
    const deck = new Deck()
    const card: Card = deck.deal()

    return expect(deck.getCards().find((c: Card) => {
      return c.is(card)
    })).toBeFalsy()
  })
})
