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
  mockTurn({turn:2, round:1, player:Player.BOT, noWorkers:true, botPersistence:mockBotPersistence(
    {cardDeck:mockCardDeck({pile:[2,3,4,5], discard:[1]})}
  )}),
  mockTurn({turn:3, round:1, player:Player.PLAYER}),
  mockTurn({turn:4, round:1, player:Player.BOT, botPersistence:mockBotPersistence(
    {cardDeck:mockCardDeck({pile:[3,4,5], discard:[2,1]})}
  )}),
  mockTurn({turn:5, round:1, endOfRound:true, player:Player.BOT}),
  mockTurn({turn:6, round:2, player:Player.PLAYER}),
  mockTurn({turn:7, round:2, endOfRound:true, player:Player.PLAYER}),
  mockTurn({turn:8, round:3, player:Player.BOT, botPersistence:mockBotPersistence(
    {cardDeck:mockCardDeck({pile:[4,5], discard:[3,2,1]})}
  )}),
  mockTurn({turn:9, round:3, endOfRound:true, player:Player.BOT}),
  mockTurn({turn:10, round:4, player:Player.PLAYER}),
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
    expect(routeCalculator.getNextRouteNoWorkers()).to.eq('/turn/2/bot/noWorkers')
  })

  it('turn2', () => {
    const routeCalculator = new RouteCalculator(2, mockRouteLocation({name:'TurnBotNoWorkers'}), state)

    expect(routeCalculator.turn).to.eq(2)
    expect(routeCalculator.round).to.eq(1)
    expect(routeCalculator.getBackRouteTo()).to.eq('/turn/2/bot/advanceShips')
    expect(routeCalculator.getNextRouteTo()).to.eq('/turn/3/player/advanceShips')
    expect(routeCalculator.getNextRouteToEndOfRound()).to.eq('/turn/3/bot/endOfRound')
    expect(routeCalculator.noWorkers).to.true
  })

  it('turn3-advance-ships', () => {
    const routeCalculator = new RouteCalculator(3, mockRouteLocation({name:'TurnPlayerAdvanceShips'}), state)

    expect(routeCalculator.turn).to.eq(3)
    expect(routeCalculator.round).to.eq(1)
    expect(routeCalculator.getBackRouteTo()).to.eq('/turn/2/bot/noWorkers')
    expect(routeCalculator.getNextRouteTo()).to.eq('/turn/3/player')
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

  it('turn10', () => {
    const routeCalculator = new RouteCalculator(10, mockRouteLocation({name:'TurnPlayer'}), state)

    expect(routeCalculator.turn).to.eq(10)
    expect(routeCalculator.round).to.eq(4)
    expect(routeCalculator.getBackRouteTo()).to.eq('/turn/9/bot/endOfRound')
    expect(routeCalculator.getNextRouteTo()).to.eq('/turn/11/bot/advanceShips')
  })

  it('turn11', () => {
    const routeCalculator = new RouteCalculator(11, mockRouteLocation({name:'TurnBot'}), state)

    expect(routeCalculator.turn).to.eq(11)
    expect(routeCalculator.round).to.eq(4)
    expect(routeCalculator.getBackRouteTo()).to.eq('/turn/11/bot/advanceShips')
    expect(routeCalculator.getNextRouteTo()).to.eq('/turn/12/endOfGame')
  })
})
