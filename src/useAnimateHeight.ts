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

  // Internal arrow function, called as many times as needed
  // (Called ~40 times with Chrome, ~20 times with Safari...)
  function step(timestamp: number) {
    if (!startTimestamp) {
      startTimestamp = timestamp
      endTimestamp = startTimestamp + duration
    }

    const elapsed = timestamp - startTimestamp
    const progress = Math.min(elapsed / duration, 1)
    const valueNow = easeFn(progress, start, end - start, 1)

    // -> The important line where the actual height of the div changes
    parentRef.value.style.height = `${valueNow}px`

    // If still not the desired end value, keep animating
    if (progress < 1) {
      window.requestAnimationFrame(step)
    }
  }

  window.requestAnimationFrame(step)
}
