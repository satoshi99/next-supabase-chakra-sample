import NextLink from 'next/link'
import { Button, Flex, Heading, Link } from '@chakra-ui/react'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { Layout } from '../components/Layout'
import { Tables } from '../components/TableComponent'
import { Notice, Todo } from '../types/types'
import { supabase } from '../utils/supabase'

export const getServerSideProps: GetServerSideProps = async () => {
  console.log('getServerSideProps/ssr invoked')
  const { data: todos } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: true })
  const { data: notices } = await supabase
    .from('notices')
    .select('*')
    .order('created_at', { ascending: true })
  return { props: { todos, notices } }
}

type StaticProps = {
  todos: Todo[]
  notices: Notice[]
}

const Ssr: NextPage<StaticProps> = ({ todos, notices }) => {
  const router = useRouter()
  return (
    <Layout title="SSR">
      <Flex direction="column">
        <Heading mb="14" textColor="teal">
          Data Fetching with SSR (Server-side rendering)
        </Heading>
      </Flex>
      <Flex direction="row" gap="10">
        <Tables todos={todos} notices={notices} />
      </Flex>
      <Flex direction="column" my="10" align="center" gap="5">
        <NextLink href="/ssg" prefetch={false} passHref>
          <Link color="orange">Link to SSG</Link>
        </NextLink>
        <NextLink href="/isr" prefetch={false} passHref>
          <Link color="green">Link to ISR</Link>
        </NextLink>
        <Button colorScheme="orange" onClick={() => router.push('/ssg')}>
          Route to SSG
        </Button>
        <Button colorScheme="green" onClick={() => router.push('/isr')}>
          Route to ISR
        </Button>
      </Flex>
    </Layout>
  )
}

export default Ssr
