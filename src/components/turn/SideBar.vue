<template>
  <div class="sidebar">
    {{t('sideBar.turn', {turn})}}
    <ul class="rules">
      <li><a data-bs-toggle="modal" href="#companyGoalsModal">{{t('rules.companyGoals.title')}}</a></li>
    </ul>
  </div>

  <CompanyGoalsModal/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import CompanyGoalsModal from '../rules/CompanyGoalsModal.vue'

export default defineComponent({
  name: 'SideBar',
  components: {
    CompanyGoalsModal
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    turn() : number {
      return this.navigationState.turn
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  float: right;
  width: 150px;
  margin-left: 15px;
  margin-bottom: 10px;
  margin-right: -12px;
  padding: 15px 10px 15px 15px;
  background-color: #ddd;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  @media (max-width: 600px) {
    font-size: 0.9rem;
    width: 135px;
  }
}
.rules {
  list-style-type: none;
  padding-left: 0;
  margin-top: 0.5rem;
  margin-bottom: 0;
  li {
    margin-bottom: 8px;
    a {
      text-decoration-line: underline;
      text-decoration-style: dotted;
      color: #333;
      font-size: 0.9rem;
      @media (max-width: 600px) {
        font-size: 0.8rem;
      }
    }
  }
}
</style>
