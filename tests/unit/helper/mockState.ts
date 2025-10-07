import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { State, Turn } from '@/store/state'

export default function mockState(params?: MockStateParams) : State {  
  return {
    language: 'en',
    baseFontSize: 1,
    setup: {
      difficultyLevel: params?.difficultyLevel ?? DifficultyLevel.EASY
    },
    turns: params?.turns ?? []
  }
}

export interface MockStateParams {
  difficultyLevel?: DifficultyLevel
  turns?: Turn[]
}
