export function easeOutQuart(t: number, b: number, c: number, d: number) {
  return -c * ((t = t / d - 1) * t * t * t - 1) + b
}

export function easeInOutQuad(t: number, b: number, c: number, d: number) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t + b
  return (-c / 2) * (--t * (t - 2) - 1) + b
}
