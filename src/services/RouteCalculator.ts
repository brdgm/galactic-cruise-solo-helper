import { State, Turn } from '@/store/state'
import Player from './enum/Player'
import { RouteLocation } from 'vue-router'

/**
 * Calculate routes for next/back respecting special "end of round" turns.
 */
export default class RouteCalculator {

  readonly round : number
  readonly turn : number
  readonly state : State

  public readonly currentPlayer : Player
  public readonly lastRound : boolean
  public readonly noWorkers : boolean

  readonly nextPlayer : Player
  readonly advanceShips : boolean
  readonly endOfRound : boolean
  readonly previousTurn? : Turn
  readonly lastTurnInGame? : number

  constructor(turn: number, route: RouteLocation, state: State) {
    this.turn = turn
    this.state = state
    this.currentPlayer = route.name?.toString().match(TURN_PLAYER_REGEX) ? Player.PLAYER : Player.BOT
    this.nextPlayer = this.currentPlayer == Player.BOT ? Player.PLAYER : Player.BOT
    this.advanceShips = route.name?.toString().match(ADVANCE_SHIPS_REGEX) != null
    this.noWorkers = route.name?.toString().match(TURN_BOT_NO_WORKERS_REGEX) != null
    this.endOfRound = route.name?.toString().match(END_OF_ROUND_REGEX) != null
    this.previousTurn = this.state.turns.find(item => item.turn == this.turn - 1)

    if (this.previousTurn?.endOfRound) {
      this.round = this.previousTurn.round + 1
    }
    else {
      this.round = this.previousTurn?.round ?? 1
    }

    this.lastTurnInGame = this.getLastTurnInGame()
    this.lastRound = this.lastTurnInGame != undefined && this.turn >= this.lastTurnInGame - 1
  }

  private getLastTurnInGame() : number|undefined {
    if (this.round == 4) {
      const round3EndTurn = this.state.turns.find(item => item.round == 3 && item.endOfRound)
      if (round3EndTurn) {
        if (round3EndTurn.player == Player.BOT) {
          return round3EndTurn.turn + 2
        }
        else {
          return round3EndTurn.turn + 3
        }
      }
    }
    return undefined
  }

  /**
   * Get route to next step in round.
   */
  public getNextRouteTo() : string {
    if (this.advanceShips) {
      return `/turn/${this.turn}/${this.currentPlayer}`
    }
    else if (this.turn == this.lastTurnInGame) {
      return `/turn/${this.turn}/endOfGame/advanceShips`
    }
    else {
      return `/turn/${this.turn + 1}/${this.nextPlayer}/advanceShips`
    }
  }

  /**
   * Get route to next step in round (end of round).
   */
  public getNextRouteToEndOfRound() : string {
    return `/turn/${this.turn + 1}/${this.currentPlayer}/endOfRound`
  }

  /**
   * Get route to next step in round for bot with no workers.
   */
  public getNextRouteNoWorkers() : string {
    return `/turn/${this.turn}/${this.currentPlayer}/noWorkers`
  }

  /**
   * Get route to previous step in round.
   */
  public getBackRouteTo() : string {
    if (this.previousTurn?.endOfRound) {
      return `/turn/${this.turn - 1}/${this.previousTurn.player}/endOfRound`
    }
    else if (this.endOfRound) {
      return `/turn/${this.turn - 1}/${this.previousTurn?.player}${this.previousTurn?.noWorkers ? '/noWorkers' : ''}`
    }
    else if (this.advanceShips) {
      if (this.turn == 1) {
        return ''
      }
      else {
        return `/turn/${this.turn - 1}/${this.previousTurn?.player ?? Player.PLAYER}${this.previousTurn?.noWorkers ? '/noWorkers' : ''}`
      }
    }
    else {
      return `/turn/${this.turn}/${this.currentPlayer}/advanceShips`
    }
  }

}

const TURN_PLAYER_REGEX = /^TurnPlayer(.+)?$/
const ADVANCE_SHIPS_REGEX = /^Turn(.+)AdvanceShips$/
const END_OF_ROUND_REGEX = /^Turn(.+)EndOfRound$/
const TURN_BOT_NO_WORKERS_REGEX = /^TurnBot(Action)?NoWorkers$/
