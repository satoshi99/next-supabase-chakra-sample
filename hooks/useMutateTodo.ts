import { useMutation, useQueryClient } from 'react-query'
import useStore from '../store'
import { EditedTodo, Todo } from '../types/types'
import { supabase } from '../utils/supabase'

export const useMutateTodo = () => {
  const queryClient = useQueryClient()
  const reset = useStore((state) => state.resetEditedTodo)

  const createTodoMutation = useMutation(
    async (todo: Omit<Todo, 'id' | 'created_at'>) => {
      const { data, error } = await supabase.from('todos').insert(todo)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        const previousTodos = queryClient.getQueryData<Todo[]>('todos')
        if (previousTodos) {
          queryClient.setQueryData('todos', [...previousTodos, res[0]])
        }
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )

  const updateTodoMutation = useMutation(
    async (todo: EditedTodo) => {
      const { data, error } = await supabase
        .from('todos')
        .update({ title: todo.title })
        .eq('id', todo.id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Todo[]>('todos')
        if (previousTodos) {
          queryClient.setQueryData(
            'todos',
            previousTodos.map((todo) =>
              todo.id === variables.id ? res[0] : todo
            )
          )
        }
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  const deleteTodoMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase.from('todos').delete().eq('id', id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (_, variables) => {
        const previousTodos = queryClient.getQueryData<Todo[]>('todos')
        if (previousTodos) {
          queryClient.setQueryData(
            'todos',
            previousTodos.filter((todo) => todo.id !== variables)
          )
        }
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )

  return { createTodoMutation, updateTodoMutation, deleteTodoMutation }
}
