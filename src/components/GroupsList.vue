<template>
  <div class="flex flex-col rounded-lg px-px py-px">
    <OneCategory
      group-key="incomeAndTransfers"
      icon="💰"
      label="Income & transfers"
      @select="$emit('toggle', $event)"
      class="rounded-t-lg"
    />
    <OneCategory
      group-key="runningCosts"
      icon="⚙️"
      label="Running costs"
      @select="$emit('toggle', $event)"
    />
    <OneCategory
      group-key="mealsAndTravel"
      icon="✈️"
      label="Meals & travel"
      @select="$emit('toggle', $event)"
    />
    <OneCategory group-key="vehicle" icon="🚗" label="Vehicle" @select="$emit('toggle', $event)" />
    <OneCategory
      group-key="financialCosts"
      icon="🏦"
      label="Financial costs"
      @select="$emit('toggle', $event)"
    />
    <OneCategory
      group-key="cogs"
      icon="⚒️"
      label="Cost of goods sold"
      @select="$emit('toggle', $event)"
    />
    <OneCategory
      group-key="miscellaneous"
      icon="🧵"
      label="Miscellaneous"
      @select="$emit('toggle', $event)"
    />
    <OneCategory
      group-key="homeOffice"
      icon="🏡"
      label="Home office"
      @select="$emit('toggle', $event)"
    />
    <OneCategory
      group-key="personal"
      icon="✌️"
      label="Personal"
      @select="$emit('toggle', $event)"
      class="!border-b-0 rounded-b-lg"
    />
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'toggle', groupKey: string): void
}>()
</script>
