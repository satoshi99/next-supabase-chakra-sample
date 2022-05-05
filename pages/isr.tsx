import NextLink from 'next/link'
import { Button, Flex, Heading, Link } from '@chakra-ui/react'
import type { GetStaticProps, NextPage } from 'next'
import { Layout } from '../components/Layout'
import { Tables } from '../components/TableComponent'
import { Notice, Todo } from '../types/types'
import { supabase } from '../utils/supabase'
import { useRouter } from 'next/router'

export const getStaticProps: GetStaticProps = async () => {
  console.log('getStaticProps/isr invoked')
  const { data: todos } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: true })
  const { data: notices } = await supabase
    .from('notices')
    .select('*')
    .order('created_at', { ascending: true })

  return { props: { todos, notices }, revalidate: 5 }
}

type StaticProps = {
  todos: Todo[]
  notices: Notice[]
}

const Isr: NextPage<StaticProps> = ({ todos, notices }) => {
  const router = useRouter()
  return (
    <Layout title="ISR">
      <Flex direction="column">
        <Heading mb="14" textColor="teal">
          Data Fetching with ISR (Incremental Static Regeneration)
        </Heading>
      </Flex>
      <Flex direction="row" gap="10">
        <Tables todos={todos} notices={notices} />
      </Flex>
      <Flex direction="column" my="10" align="center" gap="5">
        <NextLink href="/ssr" prefetch={false} passHref>
          <Link color="blue">Link to SSR</Link>
        </NextLink>
        <Button colorScheme="orange" onClick={() => router.push('/ssr')}>
          Router to SSR
        </Button>
      </Flex>
    </Layout>
  )
}

export default Isr
