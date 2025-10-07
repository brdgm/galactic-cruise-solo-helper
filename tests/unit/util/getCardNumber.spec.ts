import { expect } from 'chai'
import getCardNumber from '@/util/getCardNumber'
import Cards from '@/services/Cards'

describe('util/getCardNumber', () => {
  it('card1', () => {
    const card = Cards.get(1)
    expect(getCardNumber(card, 4)).to.equal(1)
    expect(getCardNumber(card, 5)).to.equal(1)
    expect(getCardNumber(card, 6)).to.equal(1)
  })

  it('card4', () => {
    const card = Cards.get(4)
    expect(getCardNumber(card, 4)).to.equal(4)
    expect(getCardNumber(card, 5)).to.equal(4)
    expect(getCardNumber(card, 6)).to.equal(4)
  })

  it('card5', () => {
    const card = Cards.get(5)
    expect(getCardNumber(card, 4)).to.equal(4)
    expect(getCardNumber(card, 5)).to.equal(5)
    expect(getCardNumber(card, 6)).to.equal(5)
  })

  it('card6', () => {
    const card = Cards.get(6)
    expect(getCardNumber(card, 4)).to.equal(3)
    expect(getCardNumber(card, 5)).to.equal(3)
    expect(getCardNumber(card, 6)).to.equal(6)
  })
})
