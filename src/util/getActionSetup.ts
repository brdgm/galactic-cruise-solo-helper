import Action from '@/services/enum/Action'
import WorkerLocation from '@/services/enum/WorkerLocation'
import { ActionSetup } from '@/store/state'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import { shuffle } from 'lodash'

/**
 * Get randomized action tile setup.
 * @returns Action setup
 */
export default function getActionSetup() : ActionSetup[] {
  const actions = shuffle(getAllEnumValues(Action))
  const workerLocations = getAllEnumValues(WorkerLocation)
  const actionSetups : ActionSetup[] = []
  // assign two random actions to each worker location
  for (const workerLocation of workerLocations) {
    const action1 = actions.pop()
    const action2 = actions.pop()
    if (!action1 || !action2) {
      throw new Error('Not enough actions to assign to worker locations')
    }
    actionSetups.push({ workerLocation, action1, action2 })
  }
  return actionSetups
}
