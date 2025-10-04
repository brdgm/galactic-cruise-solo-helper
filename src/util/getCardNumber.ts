import Card from '@/services/Card'

/**
 * Get number from card within the given max (4-6).
 * @param card Card
 * @param max Maximum number (4, 5 or 6)
 * @returns Number
 */
export default function getCardNumber(card: Card, max: number) : number {
  if (card.number6 <= max) {
    return card.number6
  }
  else {
    return card.number4
  }
}
