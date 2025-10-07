import DifficultyLevel from '@/services/enum/DifficultyLevel'
import SecondActionOption from '@/services/enum/SecondActionOption'

/**
 * Get settings for difficulty level.
 * @param difficultyLevel Difficulty level
 * @returns Difficulty level settings
 */
export default function getDifficultyLevelSettings(difficultyLevel : DifficultyLevel) : DifficultyLevelSettings {
  switch (difficultyLevel) {
    case DifficultyLevel.EASY:
      return { developmentsBuildGoal: 7, segmentsBuildGoal: 7, differentShipsLaunchedGoal: 3,
          secondAction: SecondActionOption.SAME_LOCATION, actionAfterMeeting: false, expertAdditionalFundingBonus: false }
    case DifficultyLevel.MEDIUM:
      return { developmentsBuildGoal: 6, segmentsBuildGoal: 6, differentShipsLaunchedGoal: 2,
          secondAction: SecondActionOption.ADJACENT_CONNECTED_LOCATION, actionAfterMeeting: false, expertAdditionalFundingBonus: true }
    case DifficultyLevel.HARD:
      return { developmentsBuildGoal: 5, segmentsBuildGoal: 4, differentShipsLaunchedGoal: 2,
          secondAction: SecondActionOption.ANY_CONNECTED_LOCATION, actionAfterMeeting: true, expertAdditionalFundingBonus: true }
    default:
      throw new Error(`Invalid difficulty level: ${difficultyLevel}`)
  }
}

export interface DifficultyLevelSettings {
  developmentsBuildGoal: number
  segmentsBuildGoal: number
  differentShipsLaunchedGoal: number
  secondAction: SecondActionOption
  actionAfterMeeting: boolean
  expertAdditionalFundingBonus: boolean
}
