import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Card from './Card'
import Action from './enum/Action'
import WorkerLocation from './enum/WorkerLocation'

/**
 * Solo cards.
 */
const cards : Card[] = [
  {
    id: 1,
    actions: [
      { action: Action.LAUNCH_SHIP, shipSize: 2 },
      { action: Action.BUILD_SHIP_SEGMENTS }
    ],
    number6: 1,
    number4: 4,
    workerLocation: WorkerLocation.TOP_LEFT
  },
  {
    id: 2,
    actions: [
      { action: Action.LAUNCH_SHIP, shipSize: 3 },
      { action: Action.BUILD_SHIP_SEGMENTS }
    ],
    number6: 2,
    number4: 3,
    workerLocation: WorkerLocation.TOP_CENTER
  },
  {
    id: 3,
    actions: [
      { action: Action.BUILD_SHIP_SEGMENTS },
      { action: Action.REFRESH_BLUEPRINTS }
    ],
    number6: 3,
    number4: 2,
    workerLocation: WorkerLocation.TOP_RIGHT
  },
  {
    id: 4,
    actions: [
      { action: Action.HIRE_EXPERT_WORKER },
      { action: Action.BUILD_DEVELOPMENT_NETWORK }
    ],
    number6: 4,
    number4: 1,
    workerLocation: WorkerLocation.BOTTOM_RIGHT
  },
  {
    id: 5,
    actions: [
      { action: Action.HIRE_EXPERT_WORKER },
      { action: Action.BUILD_DEVELOPMENT_NETWORK }
    ],
    number6: 5,
    number4: 4,
    workerLocation: WorkerLocation.BOTTOM_CENTER
  },
  {
    id: 6,
    actions: [
      { action: Action.HIRE_EXPERT_WORKER },
      { action: Action.BUILD_DEVELOPMENT_TECHNOLOGY }
    ],
    number6: 6,
    number4: 3,
    workerLocation: WorkerLocation.BOTTOM_LEFT
  },
  {
    id: 7,
    actions: [
      { action: Action.DRAW_AGENDA_CARDS },
      { action: Action.BUILD_SHIP_SEGMENTS }
    ],
    number6: 1,
    number4: 2,
    workerLocation: WorkerLocation.TOP_LEFT
  },
  {
    id: 8,
    actions: [
      { action: Action.DRAW_AGENDA_CARDS },
      { action: Action.REFILL_AGENDA_CARDS }
    ],
    number6: 2,
    number4: 1,
    workerLocation: WorkerLocation.TOP_CENTER
  },
  {
    id: 9,
    actions: [
      { action: Action.DRAW_AGENDA_CARDS },
      { action: Action.REFILL_AGENDA_CARDS }
    ],
    number6: 3,
    number4: 4,
    workerLocation: WorkerLocation.TOP_RIGHT
  },
  {
    id: 10,
    actions: [
      { action: Action.GAIN_RESOURCES },
      { action: Action.REFILL_STORAGE_SILO }
    ],
    number6: 4,
    number4: 3,
    workerLocation: WorkerLocation.BOTTOM_RIGHT
  },
  {
    id: 11,
    actions: [
      { action: Action.GAIN_RESOURCES },
      { action: Action.REFILL_STORAGE_SILO }
    ],
    number6: 5,
    number4: 2,
    workerLocation: WorkerLocation.BOTTOM_CENTER
  },
  {
    id: 12,
    actions: [
      { action: Action.ADVERTISE_CRUISE },
      { action: Action.BUILD_SHIP_SEGMENTS }
    ],
    number6: 6,
    number4: 1,
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
