import { type ListItem } from '../types/Listening'

// eslint-disable-next-line import/prefer-default-export
export const createListItem = (arr: string[]): ListItem[] => {
  return arr?.map((item, idx) => {
    return {
      id: idx + 1,
      name: item,
    }
  })
}
