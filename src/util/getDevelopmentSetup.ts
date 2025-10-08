import DevelopmentTiles from '@/services/DevelopmentTiles'
import { DevelopmentSetup } from '@/store/state'
import { shuffle } from 'lodash'

/**
 * Get randomized development tile setup.
 * @returns Development setup
 */
export default function getDevelopmentSetup() : DevelopmentSetup {
  const developments = shuffle(DevelopmentTiles.getAll())
  // draw first 4 for game, 1 for neutral, next 3 for NPC
  return {
    game: developments.slice(0, 4),
    neutral: developments[4],
    npc: developments.slice(5, 8)
  }
}
