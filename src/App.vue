<template>
  <div class="w-[350px] mt-12 mx-auto">
    <div class="parent bg-white h-[506px] rounded-lg">
      <Transition name="groups">
        <GroupsList v-if="showGroups" class="content-groups w-full" @toggle="toggle" />
      </Transition>

      <Transition name="categories">
        <div v-if="showCategories" class="content-categories h-12 w-full p-1 rounded-lg">
          <button
            class="py-2 px-3 w-full text-left hover:underline flex items-center"
            @click="toggle"
          >
            <span class="mr-1 text-lg"><Icon icon="heroicons:arrow-long-left-20-solid" /></span>
            Back
          </button>
          <div class="mt-2 ml-3">Selected: {{ selectedGroupKey }}</div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const showGroups = ref(true)
const showCategories = ref(false)
const selectedGroupKey = ref('')

function toggle(groupKey: string) {
  selectedGroupKey.value = groupKey
  showGroups.value = !showGroups.value
  showCategories.value = !showCategories.value
}
</script>

<style>
.parent {
  position: relative;
  overflow-y: hidden;
}

.content-groups,
.content-categories {
  position: absolute;
  /* v2 */
  /* position: absolute; // Set programmatically after doing JS height transition */
  top: 0;
  width: 100%;
  height: auto;
}
.content-groups {
  left: 0;
  z-index: 0;
}
.content-categories {
  left: 100%;
  transform: translate3d(-100%, 0, 0);
  z-index: 1;
}

.groups-enter-active,
.groups-leave-active,
.categories-enter-active,
.categories-leave-active {
  transition: transform 0.3s ease-in-out;
  /*transition: transform 1s ease-in-out;*/
}
.groups-enter-from,
.groups-leave-to,
.categories-leave-from,
.categories-enter-to {
  transform: translate3d(-100%, 0, 0);
}
.groups-leave-from,
.groups-enter-to,
.categories-enter-from,
.categories-leave-to {
  transform: translate3d(0, 0, 0);
}
</style>
