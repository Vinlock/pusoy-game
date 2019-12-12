import PusoyGame, { GameError } from './PusoyGame'
import PusoyPlayer from './PusoyPlayer'

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

  it('should not be able to start a game twice', async () => {
    const game = new PusoyGame(3)
    game.startGame()
    return expect(() => game.startGame()).toThrow(GameError)
  })

  it('should have 3 players (game not started)', async () => {
    const game = new PusoyGame(3)
    return expect(game.getAllPlayers()).toHaveLength(3)
  })

  it('should have 3 players (game started)', async () => {
    const game = new PusoyGame(3)
    game.startGame()
    return expect(game.getAllPlayers()).toHaveLength(3)
  })

  it('should have 0 cards in each of the 3 players hands since the game has not started', async () => {
    const game = new PusoyGame(3)
    return Promise.all(game.getAllPlayers().map((player: PusoyPlayer) => {
      return expect(player.cardsInHand).toHaveLength(0)
    }))
  })

  it('should have 15 cards in each of the 3 players hands', async () => {
    const game = new PusoyGame(3)
    game.startGame()
    return Promise.all(game.getAllPlayers().map((player: PusoyPlayer) => {
      return expect(player.cardsInHand).toHaveLength(15)
    }))
  })
})
