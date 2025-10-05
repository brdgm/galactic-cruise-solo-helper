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
  readonly nextPlayer : Player
  readonly endOfRound : boolean
  readonly previousTurn? : Turn

  constructor(turn: number, route: RouteLocation, state: State) {
    this.turn = turn
    this.state = state
    this.currentPlayer = route.name?.toString().match(TURN_REGEX) ? Player.PLAYER : Player.BOT
    this.nextPlayer = this.currentPlayer == Player.BOT ? Player.PLAYER : Player.BOT
    this.endOfRound = route.name?.toString().match(ENDOFROUND_REGEX) ? true : false
    this.previousTurn = this.state.turns.find(item => item.turn == this.turn - 1)

    if (this.previousTurn?.endOfRound) {
      this.round = this.previousTurn.round + 1
    }
    else {
      this.round = this.previousTurn?.round ?? 1
    }
  }

  /**
   * Get route to next step in round.
   */
  public getNextRouteTo() : string {
    return `/turn/${this.turn + 1}/${this.nextPlayer}`
  }

  /**
   * Get route to next step in round (end of round).
   */
  public getNextRouteToEndOfRound() : string {
    if (this.round == 4) {
      return `/turn/${this.turn + 1}/endOfGame`
    }
    else {
      return `/turn/${this.turn + 1}/${this.currentPlayer}/endOfRound`
    }
  }

  /**
   * Get route to previous step in round.
   */
  public getBackRouteTo() : string {
    if (this.turn == 1) {
      return ''
    }
    else if (this.previousTurn?.endOfRound) {
      return `/turn/${this.turn - 1}/${this.previousTurn.player}/endOfRound`
    }
    else {
      return `/turn/${this.turn - 1}/${this.previousTurn?.player ?? Player.PLAYER}`
    }
  }

}

const TURN_REGEX = /^TurnPlayer(.+)?$/
const ENDOFROUND_REGEX = /^EndOfRound$/
