<template>
  <div class="px-px py-px">
    <button
      class="mt-2 py-2 px-3 w-full text-left hover:underline flex items-center"
      @click="$emit('back')"
    >
      <span class="mr-1 text-lg"><Icon icon="heroicons:arrow-long-left-20-solid" /></span>
      Back
    </button>
    <div
      v-for="category in categories"
      :key="category"
      class="flex items-center border-b last:!border-b-0 [&>*]:last:rounded-b-lg"
    >
      <OneCategory :group-key="category" :label="category" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  selectedGroupKey?: string
}>()

defineEmits<{
  (e: 'back'): void
}>()

const categories = ref<string[]>([])

// if (props.selectedGroupKey === 'incomeAndTransfers') {
categories.value = ['Income', 'Transfers', 'Credit card payments']
// } else if (props.selectedGroupKey === 'runningCosts') {
//   categories.value = [
//     'Advertising',
//     'Apps & software',
//     'Contract labor',
//     'Hardware',
//     'Office supplies',
//     'Office utilities',
//     'Office expenses',
//     'Professional services',
//   ]
// } else {
//   categories.value = ['Other categories...']
// }
</script>
