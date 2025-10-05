import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Card from './Card'
import BotAction from './enum/BotAction'
import WorkerLocation from './enum/WorkerLocation'

/**
 * Solo cards.
 */
const cards : Card[] = [
  {
    id: 1,
    actions: [
      { action: BotAction.LAUNCH_SHIP, shipSize: 2 },
      { action: BotAction.BUILD_SHIP_SEGMENTS }
    ],
    numbers: [1, 4],
    workerLocation: WorkerLocation.TOP_LEFT
  },
  {
    id: 2,
    actions: [
      { action: BotAction.LAUNCH_SHIP, shipSize: 3 },
      { action: BotAction.BUILD_SHIP_SEGMENTS }
    ],
    numbers: [2, 3],
    workerLocation: WorkerLocation.TOP_CENTER
  },
  {
    id: 3,
    actions: [
      { action: BotAction.BUILD_SHIP_SEGMENTS },
      { action: BotAction.REFRESH_BLUEPRINTS }
    ],
    numbers: [3, 2],
    workerLocation: WorkerLocation.TOP_RIGHT
  },
  {
    id: 4,
    actions: [
      { action: BotAction.HIRE_EXPERT_WORKER_BOT },
      { action: BotAction.BUILD_DEVELOPMENT_NETWORK }
    ],
    numbers: [4, 1],
    workerLocation: WorkerLocation.BOTTOM_RIGHT
  },
  {
    id: 5,
    actions: [
      { action: BotAction.HIRE_EXPERT_WORKER_BOT },
      { action: BotAction.BUILD_DEVELOPMENT_NETWORK }
    ],
    numbers: [5, 4],
    workerLocation: WorkerLocation.BOTTOM_CENTER
  },
  {
    id: 6,
    actions: [
      { action: BotAction.HIRE_EXPERT_WORKER_BOT },
      { action: BotAction.BUILD_DEVELOPMENT_TECHNOLOGY }
    ],
    numbers: [6, 3],
    workerLocation: WorkerLocation.BOTTOM_LEFT
  },
  {
    id: 7,
    actions: [
      { action: BotAction.DRAW_AGENDA_CARDS },
      { action: BotAction.BUILD_SHIP_SEGMENTS }
    ],
    numbers: [1, 2],
    workerLocation: WorkerLocation.TOP_LEFT
  },
  {
    id: 8,
    actions: [
      { action: BotAction.DRAW_AGENDA_CARDS },
      { action: BotAction.REFILL_AGENDA_CARDS }
    ],
    numbers: [2, 1],
    workerLocation: WorkerLocation.TOP_CENTER
  },
  {
    id: 9,
    actions: [
      { action: BotAction.DRAW_AGENDA_CARDS },
      { action: BotAction.REFILL_AGENDA_CARDS }
    ],
    numbers: [3, 4],
    workerLocation: WorkerLocation.TOP_RIGHT
  },
  {
    id: 10,
    actions: [
      { action: BotAction.GAIN_RESOURCES },
      { action: BotAction.REFILL_STORAGE_SILO }
    ],
    numbers: [4, 3],
    workerLocation: WorkerLocation.BOTTOM_RIGHT
  },
  {
    id: 11,
    actions: [
      { action: BotAction.GAIN_RESOURCES },
      { action: BotAction.REFILL_STORAGE_SILO }
    ],
    numbers: [5, 2],
    workerLocation: WorkerLocation.BOTTOM_CENTER
  },
  {
    id: 12,
    actions: [
      { action: BotAction.ADVERTISE_CRUISE },
      { action: BotAction.BUILD_SHIP_SEGMENTS }
    ],
    numbers: [6, 1],
    workerLocation: WorkerLocation.BOTTOM_LEFT
  },
]

const cardsMap = new Map<number,Card>()
for (const card of cards) {
  cardsMap.set(card.id, card)
}

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: number) : Card {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @returns Cards
   */
  getAll() : Card[] {
    return cards
  }

}
