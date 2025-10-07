import { defineStore } from 'pinia'
import { name } from '@/../package.json'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Player from '@/services/enum/Player'
import Expansion from '@/services/enum/Expansion'
import toggleArrayItem from '@brdgm/brdgm-commons/src/util/array/toggleArrayItem'
import DevelopmentTile from '@/services/DevelopmentTile'
import WorkerLocation from '@/services/enum/WorkerLocation'
import Action from '@/services/enum/Action'

export const useStateStore = defineStore(`${name}.state`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1,
      setup: {
        difficultyLevel: DifficultyLevel.EASY,
        expansions: []
      },
      turns: []
    } as State
  },
  actions: {
    resetGame() {
      this.turns = []
      this.setup.actionSetup = undefined
      this.setup.developmentSetup = undefined
      this.setup.initialCardDeck = undefined
    },
    setupToggleExpansion(expansion: Expansion) : void {
      toggleArrayItem(this.setup.expansions, expansion)
    },
    storeTurn(turn : Turn) : void {
      this.turns = this.turns.filter(item => item.turn < turn.turn)
      this.turns.push(turn)
    }
  },
  persist: true
})

export interface State {
  language: string
  baseFontSize: number
  setup: Setup
  turns: Turn[]
}
export interface Setup {
  difficultyLevel: DifficultyLevel
  expansions: Expansion[]
  initialCardDeck?: CardDeckPersistence
  actionSetup?: ActionSetup[]
  developmentSetup?: DevelopmentSetup
  debugMode?: boolean
}
export interface ActionSetup {
  workerLocation: WorkerLocation
  action1: Action
  action2: Action
}
export interface DevelopmentSetup {
  game: DevelopmentTile[]
  neutral: DevelopmentTile
  npc: DevelopmentTile[]
}

export interface Turn {
  turn: number
  round: number
  player: Player
  endOfRound?: boolean
  botPersistence?: BotPersistence
  noWorkers?: boolean
}
export interface BotPersistence {
  cardDeck: CardDeckPersistence
}
export interface CardDeckPersistence {
  pile: number[]
  discard: number[]
}
