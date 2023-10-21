import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { type AppState, type AppActions } from './index.type'

const useStore = create<AppState & AppActions>()(
  devtools(
    persist(
      (set) => ({
        list: [],
        setList: (id: string) =>
          set((state) => {
            return {
              list: [...state.list, id],
            }
          }),
      }),
      {
        name: 'storage',
      },
    ),
  ),
)
export default useStore
