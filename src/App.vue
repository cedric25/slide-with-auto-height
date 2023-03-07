<template>
  <div class="w-[350px] mt-[150px] mx-auto">
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

const currentBlock = ref<'groups' | 'categories'>('groups')

const showGroups = computed(() => currentBlock.value === 'groups')
const showCategories = computed(() => currentBlock.value === 'categories')

const selectedGroupKey = ref<string | undefined>('')

const parentRef = ref(null)
const groupsRef = ref(null)
const categoriesRef = ref(null)

let changePageTimeout = undefined as unknown as ReturnType<typeof setTimeout>

function toggle(groupKey?: string) {
  if (groupKey) {
    currentBlock.value = 'categories'
    selectedGroupKey.value = groupKey
  } else {
    currentBlock.value = 'groups'
  }
}

onMounted(() => {
  animateHeight({ duration: 500, easeFn: easeInOutQuad })
})

watch(currentBlock, () => {
  clearTimeout(changePageTimeout)
  changePageTimeout = setTimeout(() => {
    // 350 -> Arbitrary value...
    // In theory we should put the same duration as the CSS transform transition (0.3s)
    // but visually it seems better to give a slightly longer duration here
    animateHeight({ duration: 350, easeFn: easeOutQuart })
  }, 0)
})

function animateHeight({ duration, easeFn }: { duration: number; easeFn: Function }) {
  const currentHeight = parentRef.value.offsetHeight

  let newHeight
  if (showCategories.value) {
    newHeight = categoriesRef.value.offsetHeight
  } else {
    newHeight = groupsRef.value.offsetHeight
  }

  animateValue(currentHeight, newHeight, duration)
}

function animateValue(start = 0, end = 0, duration: number) {
  // const maxEnd = window.innerHeight - ySpaceToKeep.value
  // if (end > maxEnd) {
  //   end = maxEnd
  // }
  let startTimestamp: number
  let endTimestamp: number
  const step = (timestamp: number) => {
    if (!startTimestamp) {
      startTimestamp = timestamp
      endTimestamp = startTimestamp + duration
    }
    const normalizedTime = duration - (endTimestamp - timestamp)
    // Math.round() pour éviter de comparer 562 et 561.9999999991697
    // et donc de finir dans le if du hask Safari de manière infinie ?...
    const valueNow =
      Math.round(easeInOutQuad(normalizedTime, start, end - start, duration) * 1000) / 1000
    parentRef.value.style.height = `${valueNow}px`
    if ((end < start && valueNow > end) || (end > start && valueNow < end)) {
      window.requestAnimationFrame(step)
    }
    // Hack for Safari
    if (normalizedTime >= duration) {
      parentRef.value.style.height = `${end}px`
    }
  }
  window.requestAnimationFrame(step)
}

function easeOutQuart(t, b, c, d) {
  return -c * ((t = t / d - 1) * t * t * t - 1) + b
}

function easeInOutQuad(t, b, c, d) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t + b
  return (-c / 2) * (--t * (t - 2) - 1) + b
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
  top: 0;
  width: 100%;
  height: auto;
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

/* --- Back --- */

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
