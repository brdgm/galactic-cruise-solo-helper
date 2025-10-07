import Player from '@/services/enum/Player'
import { BotPersistence, Turn } from '@/store/state'
import mockBotPersistence from './mockBotPersistence'

export default function mockTurn(params?: MockTurnParams) : Turn {
  return {
    turn: params?.turn ?? 1,
    round: params?.round ?? 1,
    player: params?.player ?? Player.PLAYER,
    botPersistence: params?.botPersistence ?? mockBotPersistence(),
    endOfRound: params?.endOfRound ?? undefined,
    noWorkers: params?.noWorkers ?? undefined
  }
}

export interface MockTurnParams {
  turn? : number
  round? : number
  player? : Player
  botPersistence?: BotPersistence
  endOfRound?: boolean
  noWorkers?: boolean
}
