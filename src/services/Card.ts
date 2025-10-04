import Action from './enum/Action'
import NetworkPosition from './enum/NetworkPosition'

export default interface Card {
  id: number
  actions: CardAction[]
  numbers: number[]
  networkPosition: NetworkPosition
}

export interface CardAction {
  action: Action
  shipSize?: number
}
