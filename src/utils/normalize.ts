import { v4 as uuid } from 'uuid'

// eslint-disable-next-line import/prefer-default-export
export const createListItem = (arr: string[]) => {
  return arr.map((item) => {
    return {
      id: uuid(),
      name: item,
    }
  })
}
