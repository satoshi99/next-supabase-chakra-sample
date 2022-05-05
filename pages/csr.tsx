import { Flex, Heading } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import { Tables } from '../components/TableComponent'
import { Notice, Todo } from '../types/types'
import { supabase } from '../utils/supabase'

const Csr: NextPage = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [notices, setNotices] = useState<Notice[]>([])

  useEffect(() => {
    console.log('fetch data')
    const getTodos = async () => {
      const { data: todos } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: true })
      setTodos(todos as Todo[])
    }
    const getNotices = async () => {
      const { data: notices } = await supabase
        .from('notices')
        .select('*')
        .order('created_at', { ascending: true })
      setNotices(notices as Notice[])
    }
    getTodos()
    getNotices()
  }, [])

  return (
    <Layout title="CSR">
      <Flex direction="column">
        <Heading mb="14" textColor="teal">
          Data Fetching with SSG + CSR (Client-side rendering)
        </Heading>
      </Flex>
      <Flex direction="row" gap="10">
        <Tables todos={todos} notices={notices} />
      </Flex>
    </Layout>
  )
}

export default Csr
