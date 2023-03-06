<template>
  <button
    class="one-group h-14 w-full text-left p-1 border-b pl-4 pr-3 flex items-center"
    @click="$emit('select')"
  >
    <span class="mr-2">{{ icon }}</span>
    <div class="flex-1">{{ label }}</div>
    <Icon icon="heroicons:chevron-right" class="text-xl" />
  </button>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  icon: string
  label: string
}>()

defineEmits<{
  (e: 'select'): void
}>()
</script>

<style>
.one-group:hover {
  transition: background-color 0.2s ease-in-out;
  background-color: #f5f6f9;
}
</style>
