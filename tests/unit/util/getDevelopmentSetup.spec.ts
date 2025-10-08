import { expect } from 'chai'
import getDevelopmentSetup from '@/util/getDevelopmentSetup'

describe('util/getDevelopmentSetup', () => {
  it('getDevelopmentSetup', () => {
    const developmentSetup = getDevelopmentSetup()
    expect(developmentSetup.game.length).to.equal(4)
    expect(developmentSetup.npc.length).to.equal(3)
  })
})
