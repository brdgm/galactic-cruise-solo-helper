import Action from '@/services/enum/Action'
import BotAction from '@/services/enum/BotAction'

/**
 * Get main action matching the bot action.
 * @param botAction Bot action
 * @returns Main action or undefined if no mapping exists
 */
export default function getMatchingAction(botAction: BotAction) : Action|undefined {
  switch (botAction) {
    case BotAction.BUILD_SHIP_SEGMENTS:
      return Action.BUILD_SHIP_SEGMENTS
    case BotAction.DRAW_AGENDA_CARDS:
      return Action.DRAW_AGENDA_CARDS
    case BotAction.REFILL_AGENDA_CARDS:
      return Action.REFILL_AGENDA_CARDS
    case BotAction.GAIN_RESOURCES:
      return Action.GAIN_RESOURCES
    case BotAction.REFILL_STORAGE_SILO:
      return Action.REFILL_STORAGE_SILO
    case BotAction.ADVERTISE_CRUISE:
      return Action.ADVERTISE_CRUISE
    case BotAction.BUILD_DEVELOPMENT_NETWORK:
    case BotAction.BUILD_DEVELOPMENT_TECHNOLOGY:
      return Action.BUILD_DEVELOPMENT
    case BotAction.HIRE_EXPERT_WORKER_BOT:
      return Action.HIRE_EXPERT_WORKER
    default:
      return undefined
  }
}
