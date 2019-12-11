import { Card } from '../../Deck'
import CardStack from '../../CardStack'

class PusoyHand extends CardStack {
  constructor(cards: Card[] = []) {
    super()
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
