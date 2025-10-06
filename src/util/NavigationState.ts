import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import { BotPersistence, State } from '@/store/state'
import Player from '@/services/enum/Player'
import CardDeck from '@/services/CardDeck'
import RouteCalculator from '@/services/RouteCalculator'

export default class NavigationState {

  readonly turn : number
  readonly round : number
  readonly currentPlayer : Player
  readonly noWorkers : boolean
  readonly lastRound : boolean
  readonly cardDeck : CardDeck
  readonly routeCalculator : RouteCalculator

  constructor(route: RouteLocation, state: State) {    
    this.turn = getIntRouteParam(route, 'turn')
    this.routeCalculator = new RouteCalculator(this.turn, route, state)
    this.round = this.routeCalculator.round
    this.currentPlayer = this.routeCalculator.currentPlayer
    this.noWorkers = this.routeCalculator.noWorkers
    this.lastRound = this.routeCalculator.lastRound

    const botPersistence = getLastBotPersistence(state, this.turn)
    this.cardDeck = CardDeck.fromPersistence(botPersistence.cardDeck)
    if (this.routeCalculator.currentPlayer == Player.BOT && !this.routeCalculator.endOfRound) {
      this.cardDeck.draw()
    }
  }

}

function getLastBotPersistence(state: State, turn: number) : BotPersistence {
  const turnData = state.turns
      .filter(item => (item.turn < turn) && item.botPersistence != undefined)
      .sort((a,b) => b.turn - a.turn)[0]
  if (turnData?.botPersistence) {
    return turnData?.botPersistence
  }
  return {
    cardDeck: state.setup.initialCardDeck ?? CardDeck.new().toPersistence()
  }
}
