import { expect } from 'chai'
import getMatchingAction from '@/util/getMatchingAction'
import Action from '@/services/enum/Action'
import BotAction from '@/services/enum/BotAction'

describe('util/getMatchingAction', () => {
  it('getMatchingAction', () => {
    expect(getMatchingAction(BotAction.BUILD_SHIP_SEGMENTS)).to.equal(Action.BUILD_SHIP_SEGMENTS)
    expect(getMatchingAction(BotAction.DRAW_AGENDA_CARDS)).to.equal(Action.DRAW_AGENDA_CARDS)
    expect(getMatchingAction(BotAction.REFILL_AGENDA_CARDS)).to.equal(Action.REFILL_AGENDA_CARDS)
    expect(getMatchingAction(BotAction.GAIN_RESOURCES)).to.equal(Action.GAIN_RESOURCES)
    expect(getMatchingAction(BotAction.REFILL_STORAGE_SILO)).to.equal(Action.REFILL_STORAGE_SILO)
    expect(getMatchingAction(BotAction.ADVERTISE_CRUISE)).to.equal(Action.ADVERTISE_CRUISE)
    expect(getMatchingAction(BotAction.BUILD_DEVELOPMENT_NETWORK)).to.equal(Action.BUILD_DEVELOPMENT)
    expect(getMatchingAction(BotAction.BUILD_DEVELOPMENT_TECHNOLOGY)).to.equal(Action.BUILD_DEVELOPMENT)
    expect(getMatchingAction(BotAction.HIRE_EXPERT_WORKER_BOT)).to.equal(Action.HIRE_EXPERT_WORKER)
    expect(getMatchingAction(BotAction.REFRESH_BLUEPRINTS)).to.undefined
    expect(getMatchingAction(BotAction.LAUNCH_SHIP)).to.undefined
  })
})
