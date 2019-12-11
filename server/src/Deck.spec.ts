import { allRanks, allSuits, Card, Rank, Suit } from './Deck'

describe('Deck', () => {
  const allCards: Card[] = []
  allSuits.forEach((suit: Suit) => {
    allRanks.forEach((rank: Rank) => {
      allCards.push(new Card(suit, rank))
    })
  })

  it('should have 52 cards', async () => {
    return expect(allCards).toHaveLength(52)
  })
})
