import Action from './enum/Action'

export default interface Card {
  id: number
  actions: CardAction[]
  numbers: number[]
}

export interface CardAction {
  action: Action
  shipSize?: number
}
