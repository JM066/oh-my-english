import { ListItem } from '../types/Listening'

export const createListItem = (arr: string[]): ListItem[] => {
  return arr?.map((item, idx) => {
    return {
      id: idx + 1,
      name: item,
    }
  })
}
