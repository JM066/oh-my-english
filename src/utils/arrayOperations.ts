export function shuffle<T>(items: T[]) {
  const shuffledItems = [...items]
  for (let i = shuffledItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = shuffledItems[i]
    shuffledItems[i] = shuffledItems[j]
    shuffledItems[j] = temp
  }
  return shuffledItems
}
export function addItems<T>(arrA: T[], arrB: T[]) {
  return arrA.concat(arrB)
}
