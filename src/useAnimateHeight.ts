export function useAnimateHeight({ parentRef }: { parentRef: HTMLFormElement }) {
  return ({
    duration,
    easeFn,
    childRef,
  }: {
    duration: number
    easeFn: Function
    childRef: HTMLFormElement
  }) => {
    const currentHeight = parentRef.value.offsetHeight
    const newHeight = childRef.value.offsetHeight
    animateValue(currentHeight, newHeight, duration, easeFn, parentRef)
  }
}

function animateValue(
  start = 0,
  end = 0,
  duration: number,
  easeFn: Function,
  parentRef: HTMLFormElement
) {
  let startTimestamp: number
  let endTimestamp: number
  const step = (timestamp: number) => {
    if (!startTimestamp) {
      startTimestamp = timestamp
      endTimestamp = startTimestamp + duration
    }
    const normalizedTime = duration - (endTimestamp - timestamp)
    const valueNow = Math.round(easeFn(normalizedTime, start, end - start, duration) * 1000) / 1000
    parentRef.value.style.height = `${valueNow}px`
    // Hack for Safari
    if (normalizedTime >= duration) {
      parentRef.value.style.height = `${end}px`
      return
    }
    if ((end < start && valueNow > end) || (end > start && valueNow < end)) {
      window.requestAnimationFrame(step)
    }
  }
  window.requestAnimationFrame(step)
}
