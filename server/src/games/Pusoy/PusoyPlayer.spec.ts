import PusoyGame from './PusoyGame'
import PusoyPlayer from './PusoyPlayer'
import { Card } from '../../Deck'

describe('PusoyGame', () => {
  it('should not have started the game', async () => {
    const game = new PusoyGame(3)
    return expect(game.isGameStarted()).toBeFalsy()
  })

  it('should start the game', async () => {
    const game = new PusoyGame(3)
    game.startGame()
    return expect(game.isGameStarted()).toBeTruthy()
  })

  it('should have 3 players', async () => {
    const game = new PusoyGame(3)
    return expect(game.getAllPlayers()).toHaveLength(3)
  })

  it('should have 3 players (game started)', async () => {
    const game = new PusoyGame(3)
    game.startGame()
    return expect(game.getAllPlayers()).toHaveLength(3)
  })

  it('each of the 3 players should have 15 cards', async () => {
    const game = new PusoyGame(3)
    game.startGame()
    return Promise.all(game.getAllPlayers().map((player: PusoyPlayer) => {
      return expect(player.cardsInHand).toHaveLength(15)
    }))
  })
})
