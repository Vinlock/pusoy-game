import { Card } from '../../Deck'

class PusoyHand {
  private readonly cards: Card[]

  constructor(cards: Card[] = []) {
    this.cards = cards
  }

  public addCard(card: Card): void {
    this.cards.push(card)
  }

  public useCard(card: Card): Card {
    const index: number = this.cards.findIndex((c: Card) => {
      return c.is(card)
    })
    const foundCard = this.cards[index]
    delete this.cards[index]
    return foundCard
  }

  public get hand(): Card[] {
    return this.cards
  }

  public get numCardsInHand(): number {
    return this.cards.length
  }
}

export default PusoyHand
