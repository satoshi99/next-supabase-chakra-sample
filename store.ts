import create from 'zustand'
import { EditedTodo, EditedNotice } from './types/types'

type State = {
  editedTodo: EditedTodo
  editedNotice: EditedNotice
  updateEditedTodo: (payload: EditedTodo) => void
  updateEditedNotice: (payload: EditedNotice) => void
  resetEditedTodo: () => void
  resetEditedNotice: () => void
}

const useStore = create<State>((set) => ({
  editedTodo: { id: '', title: '' },
  editedNotice: { id: '', content: '' },
  updateEditedTodo: (payload) =>
    set({
      editedTodo: {
        id: payload.id,
        title: payload.title,
      },
    }),
  resetEditedTodo: () => set({ editedTodo: { id: '', title: '' } }),
  updateEditedNotice: (payload) =>
    set({
      editedNotice: {
        id: payload.id,
        content: payload.content,
      },
    }),
  resetEditedNotice: () => set({ editedNotice: { id: '', content: '' } }),
}))

export default useStore
