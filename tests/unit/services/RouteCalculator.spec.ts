import { expect } from 'chai'
import RouteCalculator from '@/services/RouteCalculator'
import Player from '@/services/enum/Player'
import mockState from '../helper/mockState'
import mockTurn from '../helper/mockTurn'
import mockBotPersistence from '../helper/mockBotPersistence'
import mockCardDeck from '../helper/mockCardDeck'
import mockRouteLocation from '../helper/mockRouteLocation'

const state = mockState({turns:[
  mockTurn({turn:1, round:1, player:Player.PLAYER}),
  mockTurn({turn:2, round:1, player:Player.BOT, botPersistence:mockBotPersistence(
    {cardDeck:mockCardDeck({pile:[2,3], discard:[1]})}
  )}),
  mockTurn({turn:3, round:1, player:Player.PLAYER}),
  mockTurn({turn:4, round:1, player:Player.BOT, botPersistence:mockBotPersistence(
    {cardDeck:mockCardDeck({pile:[3], discard:[2,1]})}
  )}),
  mockTurn({turn:5, round:1, endOfRound:true, player:Player.BOT, botPersistence:mockBotPersistence(
    {cardDeck:mockCardDeck({pile:[3], discard:[2,1]})}
  )}),
]})

describe('services/RouteCalculator', () => {
  it('turn1-advance-ships', () => {
    const routeCalculator = new RouteCalculator(1, mockRouteLocation({name:'TurnPlayerAdvanceShips'}), state)

    expect(routeCalculator.turn).to.eq(1)
    expect(routeCalculator.round).to.eq(1)
    expect(routeCalculator.getBackRouteTo()).to.eq('')
    expect(routeCalculator.getNextRouteTo()).to.eq('/turn/1/player')
  })

  it('turn1', () => {
    const routeCalculator = new RouteCalculator(1, mockRouteLocation({name:'TurnPlayer'}), state)

    expect(routeCalculator.turn).to.eq(1)
    expect(routeCalculator.round).to.eq(1)
    expect(routeCalculator.getBackRouteTo()).to.eq('/turn/1/player/advanceShips')
    expect(routeCalculator.getNextRouteTo()).to.eq('/turn/2/bot/advanceShips')
    expect(routeCalculator.getNextRouteToEndOfRound()).to.eq('/turn/2/player/endOfRound')
  })

  it('turn2-advance-ships', () => {
    const routeCalculator = new RouteCalculator(2, mockRouteLocation({name:'TurnBotAdvanceShips'}), state)

    expect(routeCalculator.turn).to.eq(2)
    expect(routeCalculator.round).to.eq(1)
    expect(routeCalculator.getBackRouteTo()).to.eq('/turn/1/player')
    expect(routeCalculator.getNextRouteTo()).to.eq('/turn/2/bot')
  })

  it('turn2', () => {
    const routeCalculator = new RouteCalculator(2, mockRouteLocation({name:'TurnBot'}), state)

    expect(routeCalculator.turn).to.eq(2)
    expect(routeCalculator.round).to.eq(1)
    expect(routeCalculator.getBackRouteTo()).to.eq('/turn/2/bot/advanceShips')
    expect(routeCalculator.getNextRouteTo()).to.eq('/turn/3/player/advanceShips')
    expect(routeCalculator.getNextRouteToEndOfRound()).to.eq('/turn/3/bot/endOfRound')
  })

  it('turn4-advance-ships', () => {
    const routeCalculator = new RouteCalculator(4, mockRouteLocation({name:'TurnBotAdvanceShips'}), state)

    expect(routeCalculator.turn).to.eq(4)
    expect(routeCalculator.round).to.eq(1)
    expect(routeCalculator.getBackRouteTo()).to.eq('/turn/3/player')
    expect(routeCalculator.getNextRouteTo()).to.eq('/turn/4/bot')
  })

  it('turn4', () => {
    const routeCalculator = new RouteCalculator(4, mockRouteLocation({name:'TurnBot'}), state)

    expect(routeCalculator.turn).to.eq(4)
    expect(routeCalculator.round).to.eq(1)
    expect(routeCalculator.getBackRouteTo()).to.eq('/turn/4/bot/advanceShips')
    expect(routeCalculator.getNextRouteTo()).to.eq('/turn/5/player/advanceShips')
    expect(routeCalculator.getNextRouteToEndOfRound()).to.eq('/turn/5/bot/endOfRound')
  })

  it('turn5-endOfRound', () => {
    const routeCalculator = new RouteCalculator(5, mockRouteLocation({name:'TurnBotEndOfRound'}), state)

    expect(routeCalculator.turn).to.eq(5)
    expect(routeCalculator.round).to.eq(1)
    expect(routeCalculator.getBackRouteTo()).to.eq('/turn/4/bot')
    expect(routeCalculator.getNextRouteTo()).to.eq('/turn/6/player/advanceShips')
  })

  it('turn6-advance-ships', () => {
    const routeCalculator = new RouteCalculator(6, mockRouteLocation({name:'TurnPlayerAdvanceShips'}), state)

    expect(routeCalculator.turn).to.eq(6)
    expect(routeCalculator.round).to.eq(2)
    expect(routeCalculator.getBackRouteTo()).to.eq('/turn/5/bot/endOfRound')
    expect(routeCalculator.getNextRouteTo()).to.eq('/turn/6/player')
    expect(routeCalculator.getNextRouteToEndOfRound()).to.eq('/turn/7/player/endOfRound')
  })
})
