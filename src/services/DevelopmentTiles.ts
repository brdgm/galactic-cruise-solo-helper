import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import DevelopmentTile from './DevelopmentTile'

/**
 * Development tiles
 */
const tiles : DevelopmentTile[] = [
  {
    id: 1,
    developmentPos: 2,
    networkLocations: [2, 5]
  },
  {
    id: 2,
    developmentPos: 1,
    networkLocations: [1, 5]
  },
  {
    id: 3,
    developmentPos: 4,
    networkLocations: [1, 4]
  },
  {
    id: 4,
    developmentPos: 4,
    networkLocations: [3, 6]
  },
  {
    id: 5,
    developmentPos: 3,
    networkLocations: [2, 4]
  },
  {
    id: 6,
    developmentPos: 2,
    networkLocations: [5, 6]
  },
  {
    id: 7,
    developmentPos: 1,
    networkLocations: [1, 3]
  },
  {
    id: 8,
    developmentPos: 3,
    networkLocations: [4, 6]
  },
]

const tilesMap = new Map<number,DevelopmentTile>()
for (const tile of tiles) {
  tilesMap.set(tile.id, tile)
}

export default {

  /**
   * Get development tile by ID
   * @param id ID
   * @returns Development tile
   */
  get(id: number) : DevelopmentTile {
    return findMandatory(tilesMap, id)
  },

  /**
   * Get all development tiles
   * @returns Development tiles
   */
  getAll() : DevelopmentTile[] {
    return tiles
  }

}
