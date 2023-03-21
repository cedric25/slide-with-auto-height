<template>
  <div class="w-[350px] mt-[10vh] mx-auto">
    <div ref="parentRef" class="parent bg-white rounded-lg">
      <Transition name="groups">
        <div v-if="showGroups" ref="groupsRef" class="content-groups">
          <GroupsList @toggle="toggle" />
        </div>
      </Transition>

      <Transition name="categories">
        <div v-if="showCategories" ref="categoriesRef" class="content-categories">
          <CategoriesList :selected-group-key="selectedGroupKey" @back="toggle" />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { usePreferredReducedMotion } from '@vueuse/core'
import { useAnimateHeight } from './useAnimateHeight'
import { easeInOutQuad, easeOutQuart } from './easeFunctions'

const currentBlock = ref<'groups' | 'categories'>('groups')

const showGroups = computed(() => currentBlock.value === 'groups')
const showCategories = computed(() => currentBlock.value === 'categories')

const selectedGroupKey = ref<string | undefined>('')

const parentRef = ref() as unknown as HTMLFormElement
const groupsRef = ref() as unknown as HTMLFormElement
const categoriesRef = ref() as unknown as HTMLFormElement

const animateHeight = useAnimateHeight({ parentRef })

let changePageTimeout = undefined as unknown as ReturnType<typeof setTimeout>

function toggle(groupKey?: string) {
  if (groupKey) {
    currentBlock.value = 'categories'
    selectedGroupKey.value = groupKey
  } else {
    currentBlock.value = 'groups'
  }
}

const preferredMotion = usePreferredReducedMotion()
const shouldReduceMotion = preferredMotion.value === 'reduce'

onMounted(() => {
  if (shouldReduceMotion) {
    parentRef.value.style.height = `${groupsRef.value.offsetHeight}px`
    return
  }
  // Slightly slower animation at page init, with a different easing function
  animateHeight({ duration: 450, easeFn: easeInOutQuad, childRef: groupsRef })
})

watch(currentBlock, () => {
  const childRef = currentBlock.value === 'categories' ? categoriesRef : groupsRef
  if (shouldReduceMotion) {
    setTimeout(() => {
      parentRef.value.style.height = `${childRef.value.offsetHeight}px`
    })
    return
  }
  clearTimeout(changePageTimeout)
  changePageTimeout = setTimeout(() => {
    // 350 -> Arbitrary value...
    // In theory we should put the same duration as the CSS transform transition (0.3s)
    // but visually it seems better to give a slightly longer duration here
    animateHeight({ duration: 350, easeFn: easeOutQuart, childRef })
  }, 0)
})
</script>

<style>
.parent {
  position: relative;
  overflow-y: hidden;
}

.content-groups,
.content-categories {
  position: absolute;
  top: 0;
  width: 100%;
}
.content-groups {
  left: 0;
}
.content-categories {
  left: 100%;
  transform: translate3d(-100%, 0, 0);
}

/* When removed from the DOM, we need the groups to move to the left */
.groups-leave-from {
  transform: translate3d(0, 0, 0); /* Basically, no transform */
}
.groups-leave-to {
  transform: translate3d(-100%, 0, 0); /* Move 100% or the parent div width to the left */
}

.categories-enter-from {
  opacity: 0;
  transform: translate3d(0, 0, 0);
}
.categories-enter-to {
  opacity: 1;
  transform: translate3d(-100%, 0, 0);
}

/* --- "Back" transition --- */

.groups-enter-from {
  transform: translate3d(-100%, 0, 0);
}
.groups-enter-to {
  transform: translate3d(0, 0, 0);
}

.categories-leave-from {
  transform: translate3d(-100%, 0, 0);
}
.categories-leave-to {
  transform: translate3d(0, 0, 0);
}

.groups-enter-active,
.groups-leave-active,
.categories-enter-active,
.categories-leave-active {
  transition: transform 0.3s ease-in-out;
}
</style>
