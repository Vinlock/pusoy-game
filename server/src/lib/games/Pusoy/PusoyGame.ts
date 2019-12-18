import Game from '../Game'
import PusoyPlayer from './PusoyPlayer'
import Deck, { Card } from '../Deck'
import PusoyPile from './PusoyPile'
import PusoyPlayedHand from './PusoyPlayedHand'
import CustomError from '../../../utils/CustomError'
import User from '../../User'

const MAX_CARDS_TO_DEAL = 15

/**
 * Pusoy Game
 * @event start_game (PusoyGame) When the game starts
 * @event hand_played (PusoyPlayedHand, PusoyGame) When a hand is played
 * @extends Game
 */
class PusoyGame extends Game {
  /**
   * Game is started
   */
  private gameIsStarted: boolean = false

  /**
   * List of players
   */
  private players: PusoyPlayer[] = []

  /**
   * The deck to play from
   */
  private deck: Deck = new Deck()

  /**
   * The play pile
   */
  private playPile: PusoyPile = new PusoyPile()

  /**
   * List of winning players
   */
  private winningPlayers: PusoyPlayer[] = []

  /**
   * Current Turn Data
   */
  private currentTurn: Turn = {
    player: null,
    handToBeat: null,
    numPasses: 0,
  }

  /**
   * PusoyGame Constructor
   * @param {User[]} users Users
   * @constructor
   */
  constructor(users: User[]) {
    super()
    users.forEach((user: User) => {
      this.players.push(new PusoyPlayer(user))
    })
  }

  /**
   * Get number of players
   * @returns {number} Number of active players in the game
   */
  public get numPlayers(): number {
    let num = this.players.length
    if (this.currentTurn.player) {
      num++
    }
    return num
  }

  /**
   * Start Game
   * @throws {GameError} Trying to start an already started game
   * @fires PusoyGame:game_started
   */
  startGame(): void {
    if (this.gameIsStarted) {
      throw new GameError('Cannot start an already started game.')
    }

    // Find number of cards to deal
    let numCardsToDeal = Math.floor(this.deck.numCards / this.numPlayers)
    if (numCardsToDeal > MAX_CARDS_TO_DEAL) {
      numCardsToDeal = MAX_CARDS_TO_DEAL
    }

    // Deal hands
    Array.from(Array(numCardsToDeal)).forEach(() => {
      this.players.forEach((player: PusoyPlayer) => {
        this.playerDraw(player.id)
      })
    })

    // Setup Turn
    this.currentTurn.player = this.players.pop()
    this.currentTurn.handToBeat = null
    this.currentTurn.numPasses = 0

    // Start Game
    this.gameIsStarted = true
    this.emit('game_started', this)
  }

  /**
   * Player draws a card
   * @param playerId
   * @fires PusoyGame:player_draw (PusoyPlayer, PusoyGame)
   */
  public playerDraw(playerId: string): void {
    const player = this.getPlayerById(playerId)
    player.addCardToHand(this.deck.deal())
    this.emit('player_draw', player, this)
  }

  /**
   * Play a hand from a player
   * @param playerId
   * @param hand
   * @fires PusoyGame:hand_played (PusoyPlayedHand, PusoyGame)
   */
  public playerPlayHand(playerId: string, hand: Card[]): boolean {
    this.confirmPlayerTurn(playerId)

    const player = this.getPlayerById(playerId)

    // Create Hand
    const playedHand = new PusoyPlayedHand(hand, player.id)

    // Check if the player can play the given hand
    const playerCanPlay: boolean = player.playHand(playedHand)

    if (!playerCanPlay) {
      return false
    }

    // Check if the hand can be played to the pile
    const freshPile = this.currentTurn.handToBeat === null
    if (!freshPile && !playedHand.beats(this.currentTurn.handToBeat)) {
      return false
    }

    // Play
    player.playHand(playedHand)
    this.playPile.playHand(playedHand, freshPile)
    this.currentTurn.handToBeat = playedHand
    this.emit('hand_played', playedHand, this)

    // Check if they have won
    if (player.cardsInHand.length === 0) {
      // Player wins
      this.winningPlayers.push(player)
      const place = this.winningPlayers.length
      this.emit('player_win', player, place, this)
      if (this.numPlayers === 1) {
        this.endGame()
      }
    }

    // Reset numPasses
    this.currentTurn.numPasses = 0

    // Go to next turn
    this.nextTurn()

    return true
  }

  /**
   * Pass player turn
   * @param {string} playerId Player ID
   * @returns {boolean} Successfully passed
   */
  public playerPass(playerId: string): boolean {
    this.confirmPlayerTurn(playerId)

    if (this.currentTurn.numPasses === (this.players.length - 1)) {
      return false
    }

    this.currentTurn.numPasses++

    if (this.currentTurn.numPasses === (this.players.length - 1)) {
      this.currentTurn.handToBeat = null
    }

    if (this.deck.numCards > 0) {
      this.playerDraw(playerId)
    }

    this.emit('player_pass', this.currentTurn.player, this)

    this.nextTurn()

    return true
  }

  /**
   * End Game
   * @fires PusoyGame:game_over (PusoyGame)
   */
  public endGame(): void {
    this.emit('game_over', this)
  }

  /**
   * Check if it is the current player's turn or throw
   * @param {string} playerId Player ID
   * @throws {WrongTurn}
   */
  public confirmPlayerTurn(playerId: string) {
    if (!this.isPlayersTurn(playerId)) {
      throw new WrongTurn('It must be the player\'s turn to take this action.')
    }
  }

  /**
   * Check if it is the current player's turn
   * @param {string} playerId Player ID
   */
  public isPlayersTurn(playerId: string) {
    return this.currentTurn.player.id === playerId
  }

  /**
   * Check if the game is started
   * @returns {boolean} Game Started?
   */
  public isGameStarted(): boolean {
    return this.gameIsStarted
  }

  /**
   * Get Player by ID
   * @param {string} playerId Player ID
   * @throws {PlayerNotFound} Player ID could not be found
   * @returns {PusoyPlayer} Players Found
   */
  public getPlayerById(playerId: string): PusoyPlayer {
    const player = this.players.find((player: PusoyPlayer) => {
      return player.id === playerId
    })
    if (!player) {
      throw new PlayerNotFound(`Player ID "${playerId}" could not be found.`)
    }
    return player
  }

  /**
   * Go to next turn
   * @fires PusoyGame:turn_change (PusoyPlayer, PusoyGame)
   */
  public nextTurn(): void {
    const hasWon = Boolean(this.winningPlayers.find((player: PusoyPlayer) => {
      return player.id === this.currentTurn.player.id
    }))

    if (!hasWon) {
      this.players.push(this.currentTurn.player)
    }

    this.currentTurn.player = this.players.pop()
    this.emit('turn_change', this.currentTurn.player, this)
  }

  public getAllPlayers(): PusoyPlayer[] {
    let players = this.players
    if (this.currentTurn.player) {
      players = players.concat(this.currentTurn.player)
    }
    return players
  }
}

export type Turn = {
  player: PusoyPlayer,
  handToBeat: PusoyPlayedHand,
  numPasses: number,
}

export class GameError extends CustomError {}
export class PlayerNotFound extends GameError {}
export class WrongTurn extends GameError {}

export default PusoyGame
