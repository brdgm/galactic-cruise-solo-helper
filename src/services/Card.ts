import Action from './enum/Action'
import WorkerLocation from './enum/WorkerLocation'

export default interface Card {
  id: number
  actions: CardAction[]
  numbers: number[]
  workerLocation: WorkerLocation
}

export interface CardAction {
  action: Action
  shipSize?: number
}
