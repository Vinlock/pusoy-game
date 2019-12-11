import Game from '../Game'
import PusoyPlayer from './PusoyPlayer'
import Deck from '../../Deck'
import PusoyPile from './PusoyPile'

const MAX_CARDS_TO_DEAL = 15

class PusoyGame extends Game {
  private players: { [key: string]: PusoyPlayer }

  private deck: Deck = new Deck()

  private pile: PusoyPile = new PusoyPile()

  constructor(numPlayers: number) {
    super()
    PusoyPlayer.createPlayers(numPlayers).forEach((player: PusoyPlayer) => {
      this.players[player.id] = player
    })

    // Find number of cards to deal
    let numCardsToDeal = Math.floor(this.deck.numCards / numPlayers)
    if (numCardsToDeal > MAX_CARDS_TO_DEAL) {
      numCardsToDeal = MAX_CARDS_TO_DEAL
    }

    // Deal hands
    for (let i = 0; i < numCardsToDeal; i++) {
      Object.keys(this.players).forEach((playerId: string) => {
        this.playerDraw(playerId)
      })
    }
  }

  public playerDraw(playerId: string): void {
    this.players[playerId].addCardToHand(this.deck.deal())
  }

  public playerPlayCard(playerId: string, card: Card): void {

  }
}

export default PusoyGame
