<template>
  <div class="flex flex-col rounded-lg px-px py-px [&>*]:border-b">
    <OneCategory
      group-key="incomeAndTransfers"
      icon="๐ฐ"
      label="Income & transfers"
      class="rounded-t-lg"
      @select="$emit('toggle', $event)"
    />
    <OneCategory
      group-key="runningCosts"
      icon="โ๏ธ"
      label="Running costs"
      @select="$emit('toggle', $event)"
    />
    <OneCategory
      group-key="mealsAndTravel"
      icon="โ๏ธ"
      label="Meals & travel"
      @select="$emit('toggle', $event)"
    />
    <OneCategory group-key="vehicle" icon="๐" label="Vehicle" @select="$emit('toggle', $event)" />
    <OneCategory
      group-key="financialCosts"
      icon="๐ฆ"
      label="Financial costs"
      @select="$emit('toggle', $event)"
    />
    <OneCategory
      group-key="cogs"
      icon="โ๏ธ"
      label="Cost of goods sold"
      @select="$emit('toggle', $event)"
    />
    <OneCategory
      group-key="miscellaneous"
      icon="๐งต"
      label="Miscellaneous"
      @select="$emit('toggle', $event)"
    />
    <OneCategory
      group-key="homeOffice"
      icon="๐ก"
      label="Home office"
      @select="$emit('toggle', $event)"
    />
    <OneCategory
      group-key="personal"
      icon="โ๏ธ"
      label="Personal"
      class="!border-b-0 rounded-b-lg"
      @select="$emit('toggle', $event)"
    />
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'toggle', groupKey: string): void
}>()
</script>
