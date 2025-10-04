import { expect } from 'chai'
import getActionSetup from '@/util/getActionSetup'

describe('util/getActionSetup', () => {
  it('getActionSetup', () => {
    const actionSetup = getActionSetup()
    expect(actionSetup.length).to.equal(6)
  })
})
