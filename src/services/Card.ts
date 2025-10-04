import BotAction from './enum/BotAction'
import WorkerLocation from './enum/WorkerLocation'

export default interface Card {
  id: number
  actions: CardAction[]
  number6: number
  number4: number
  workerLocation: WorkerLocation
}

export interface CardAction {
  action: BotAction
  shipSize?: number
}
