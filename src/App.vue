<template>
  <div class="w-[350px] mt-12 mx-auto">
    <div class="parent bg-white h-[506px] rounded-lg">
      <Transition name="groups">
        <div v-if="showGroups" class="content-groups w-full">
          <div class="flex flex-col rounded-lg px-px py-px">
            <OneCategory
              icon="💰"
              label="Income & transfers"
              @select="toggle"
              class="rounded-t-lg"
            />
            <OneCategory icon="⚙️" label="Running costs" @select="toggle" />
            <OneCategory icon="✈️" label="Meals & travel" @select="toggle" />
            <OneCategory icon="🚗" label="Vehicle" @select="toggle" />
            <OneCategory icon="🏦" label="Financial costs" @select="toggle" />
            <OneCategory icon="⚒️" label="Cost of goods sold" @select="toggle" />
            <OneCategory icon="🧵" label="Miscellaneous" @select="toggle" />
            <OneCategory icon="🏡" label="Home office" @select="toggle" />
            <OneCategory
              icon="✌️"
              label="Personal"
              @select="toggle"
              class="!border-b-0 rounded-b-lg"
            />
          </div>
        </div>
      </Transition>

      <Transition name="categories">
        <div
          v-if="showCategories"
          class="content-categories border border-green-200 h-12 w-full p-1 rounded-lg"
        >
          <button
            class="py-2 px-3 w-full text-left hover:underline flex items-center"
            @click="toggle"
          >
            <span class="mr-1 text-lg"><Icon icon="heroicons:arrow-long-left-20-solid" /></span>
            Back
          </button>
          <div>Categories</div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import OneCategory from './components/OneCategory.vue'

const showGroups = ref(true)
const showCategories = ref(false)

function toggle() {
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
