export type Todo = {
  id: string
  created_at: string
  title: string
  user_id: string | undefined
}

export type Notice = {
  id: string
  created_at: string
  content: string
  user_id: string | undefined
}

export type EditedTodo = Omit<Todo, 'created_at' | 'user_id'>
export type EditedNotice = Omit<Notice, 'created_at' | 'user_id'>
