<template>
  <button class="one-group h-14 w-full text-left p-1 border-b px-4" @click="$emit('select')">
    <span class="mr-2">{{ icon }}</span>
    {{ label }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string
  label: string
}>()

const emit = defineEmits<{
  (e: 'select'): void
}>()
</script>

<style>
.one-group:hover {
  transition: background-color 0.2s ease-in-out;
  background-color: #f5f6f9;
}
</style>
