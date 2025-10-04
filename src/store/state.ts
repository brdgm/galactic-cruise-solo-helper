import { defineStore } from 'pinia'
import { name } from '@/../package.json'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Player from '@/services/enum/Player'
import Expansion from '@/services/enum/Expansion'
import toggleArrayItem from '@brdgm/brdgm-commons/src/util/array/toggleArrayItem'

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
  debugMode?: boolean
}

export interface Turn {
  turn: number
  round: number
  player: Player
  botPersistence?: BotPersistence
}
export interface BotPersistence {
  cardDeck: CardDeckPersistence
}
export interface CardDeckPersistence {
  pile: number[]
  discard: number[]
}
