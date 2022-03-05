export function debounce(delay) {
  let timer = null

    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      return 1
    }, delay)

}
