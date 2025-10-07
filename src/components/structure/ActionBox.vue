<template>
  <div class="actionBox col" @click="showInstructions">
    <div class="checkmark" v-if="checked">✓</div>
    <slot name="action"></slot>
  </div>

  <ModalDialog :id="modalId" :title="instructionTitle" :scrollable="true" :size-lg="modalSizeLg">
    <template #body>
      <slot name="instruction"></slot>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import showModal from '@brdgm/brdgm-commons/src/util/modal/showModal'
import { nanoid } from 'nanoid'

export default defineComponent({
  name: 'ActionBox',
  components: {
    ModalDialog
  },
  setup() {
    const modalId = `modal-${nanoid()}`
    return { modalId }
  },
  props: {
    instructionTitle: {
      type: String,
      required: true
    },
    checked: {
      type: Boolean,
      required: false
    },
    modalSizeLg: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    showInstructions() {
      showModal(this.modalId)
    }
  }
})
</script>

<style lang="scss" scoped>
.actionBox {
  position: relative;
  display: flex;
  background-color: #f6efe0;
  border: 2px solid #d8c6ac;
  border-radius: 0.5rem;
  filter: drop-shadow(0.1rem 0.1rem 0.2rem #aaa);
  padding: 1rem;
  cursor: pointer;
  max-width: 300px;
  background-image: url('@/assets/icons/help-semi-transparent.png');
  background-repeat: no-repeat;
  background-position: right 5px top 5px;
  background-size: 1.25rem;
  justify-content: center;
  margin-bottom: 0.75rem;
  .checkmark {
    position: absolute;
    right: -1rem;
    bottom: -0.5rem;
    font-size: 4rem;
    font-weight: bold;
    color: green;
  }
}
</style>
