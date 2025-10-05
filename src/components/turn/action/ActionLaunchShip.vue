<template>
  <ActionBox :instructionTitle="t(`rules.bot.action.${action.action}.title`)" :modalSizeLg="true">
    <template #action>
      <AppIcon type="action" :name="`${action.action}-${action.shipSize}`" extension="svg" class="icon"/>
    </template>
    <template #instruction>
      <p>Rachel executes this action if she has a ship with <b>{{action.shipSize}} Segments</b> available.</p>
      <p>When Rachel performs this action she places her Worker into her Launch Elevator instead of the Network. If resolving this as her second action of the turn, she instead moves the Worker from her first action to the Launch Elevator.</p>
      <p>If Rachel has multiple Ships that fits the criteria, she will choose a Ship to launch prioritizing the following:</p>
      <ol>
        <li>A Ship that hasn’t been launched.</li>
        <li>A Ship that will score the most VP.</li>
        <li>The rightmost Ship.</li>
      </ol>
      <hr/>
      <h5>5. Assign and Board</h5>
      <div class="float-end ms-3">
        <AgendaCardSelection :position="cruisePos"/>
      </div>
      <ul>
        <li>Rachel chooses the marked Cruise and places it above that Ship. She may not take a Cruise that you have scheduled.</li>
        <li>She then takes any Guests next to the Cruise and adds them to her Ship; if no Guests were pre-sold tickets, she will sell Last-Minute tickets to matching Guests from the Queue to fill up her Cabins (following the rules from the Advertise for a Cruise action).</li>
        <li>If she only has one Cabin but takes 2 Guests because they were presold tickets, she returns one randomly to the back of the Queue (3 Ad cost) and loses 2 Reputation (like a human player would).</li>
      </ul>
      <h5>4. Place Progress Cube</h5>
      <ul>
        <li>She adds a Progress Cube from her supply to the Progress Track.</li>
      </ul>
      <h5>3. Pay Resources</h5>
      <ul>
        <li>Compare the printed Fuel cost of the Cruise to Rachel’s Fuel row on her Player Board. The largest visible number in her Fuel row is her Fuel capacity.</li>
        <li>If the Cruise’s Fuel cost is higher than Rachel’s Fuel capacity, she will spend Reputation to supplement the Fuel cost, reducing her Reputation tracker past the required number of Resource icons.</li>
        <li>If her Reputation tracker is at “0,” she will still launch, but she loses 1 VP per extra Fuel needed.</li>
      </ul>
      <h5>2. Score Cockpit</h5>
      <ul>
        <li>Rachel scores Cockpits by adding the VP listed on the Cockpit to all the VP on Segments in that Ship.</li>
        <li>If this is the first time that Ship is launched, the Cockpit is flipped over, removing the -5 VP at the top.</li>
      </ul>
      <h5>1. Load Up</h5>
      <ul>
        <li>Rachel flips (without gaining its bonus) and moves one Upgrade Token from her Launch Tower to her Engine.</li>
        <li>She removes them in this order: the lower 4 tokens (in any order) until the leftmost Expert is hired, then the 1 VP Funding Bonus token. After this, she takes any Upgrade Token in any order.</li>
      </ul>
      <h5>0. Liftoff!</h5>
      <ul>
        <li>Place Rachel's Worker into the Cockpit of the Ship, and then add a new Cruise to the Marketing Board as usual.</li>
      </ul>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import { CardAction } from '@/services/Card'
import ActionBox from '@/components/structure/ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import getCardNumber from '@/util/getCardNumber'
import AgendaCardSelection from '@/components/structure/AgendaCardSelection.vue'

export default defineComponent({
  name: 'ActionLaunchShip',
  emits: {
    extraVP: (_extraVP: number) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    ActionBox,
    AppIcon,
    AgendaCardSelection
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    },
    action: {
      type: Object as PropType<CardAction>,
      required: true
    }
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  computed: {
    cruisePos() : number {
      return getCardNumber(this.navigationState.cardDeck.supportCard, 4)
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 3em;
}
</style>
