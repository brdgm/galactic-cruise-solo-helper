<template>
  <ol>
    <li>Set up the game for a <b>2-player game</b> (including the NPC setup).</li>
    <li>Rachel receives a <b>Player Board</b> and sets up all the usual pieces that a player would use. She does NOT need Resource trackers and always uses the base game Upgrade Tokens.</li>
    <li>She will be the <b>2nd player</b>, so place her Reputation tracker on the “1” space of the Reputation Track.</li>
    <li>Place the <b>Solo Tokens</b> (Rachel's Company Goal threshold reminders) on the appropriate spaces:</li>
    <ul class="soloTokens">
      <li>
        <AppIcon type="solo-token" name="development" class="icon"/>
        <span>Place this onto her <b>middle</b> Fuel Development.</span>
      </li>
      <li>
        <AppIcon type="solo-token" name="segment" class="icon"/>
        <span>Place this around the area where Rachel's <b>Xth Segment</b> will be built.</span>
      </li>
      <li>
        <AppIcon type="solo-token" name="ship" class="icon"/>
        <span>Place this above the area where Rachel's <b>third Ship</b> will be.</span>
      </li>
    </ul>
    <li>Place the <b>Solo Worker Card</b> of your chosen difficulty next to the Action Cards (this will help you to remember to Call a Meeting if she has no Workers). This is her Break Room—place her Workers here instead of on her Player Board.</li>
    <li>
      <span>Rachel places her <b>first Development</b> (from the Food row) in the Network. This placement must be in an area with no other Developments as usual.</span><br/>
      <NetworkLocationDisplay :networkLocation="supportCard.number6" />
    </li>
    <li>She then <b>discards Blueprint #0</b> based on the Number System.</li>
  </ol>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import { useRouter } from 'vue-router'
import Card from '@/services/Card'
import CardDeck from '@/services/CardDeck'
import NetworkLocationDisplay from '../structure/NetworkLocationDisplay.vue'
import AppIcon from '../structure/AppIcon.vue'

export default defineComponent({
  name: 'GameSetup',
  components: {
    NetworkLocationDisplay,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const router = useRouter()

    return { t, state, router }
  },
  computed: {
    supportCard() : Card {
      const cardDeck = this.state.setup.initialCardDeck ? CardDeck.fromPersistence(this.state.setup.initialCardDeck) : CardDeck.new()
      return cardDeck.supportCard
    }
  }
})
</script>

<style lang="scss" scoped>
.soloTokens {
  li {
    margin-bottom: 3px;
  }
  .icon {
    width: 40px;
    margin-right: 8px;
  }
}
</style>
