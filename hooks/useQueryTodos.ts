import { useQuery } from 'react-query'
import { supabase } from '../utils/supabase'
import { Todo } from '../types/types'

export const useQueryTodos = () => {
  const getTodos = async () => {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: true })
    if (error) {
      throw new Error(`${error.message}: ${error.details}`)
    }
    return data
  }
  return useQuery<Todo[], Error>({
    queryKey: 'todos',
    queryFn: getTodos,
    staleTime: Infinity,
  })
}
