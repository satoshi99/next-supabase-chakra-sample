import { Button, Flex, Heading, Link } from '@chakra-ui/react'
import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { Layout } from '../components/Layout'
import { Notice, Todo } from '../types/types'
import { supabase } from '../utils/supabase'
import { Tables } from '../components/TableComponent'

export const getStaticProps: GetStaticProps = async () => {
  console.log('getStaticProps/ssg invoked')
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

const Ssg: NextPage<StaticProps> = ({ todos, notices }) => {
  const router = useRouter()
  return (
    <Layout title="SSG">
      <Heading mb="14" textColor="teal">
        Data Fetching with SSG (Static-site generation)
      </Heading>
      <Flex direction="row" gap="10">
        <Tables todos={todos} notices={notices} />
      </Flex>
      <Flex direction="column" my="10" align="center">
        <NextLink href="/ssr" prefetch={false} passHref>
          <Link mb="5" color="blue">
            Link to SSR
          </Link>
        </NextLink>
        <Button colorScheme="orange" onClick={() => router.push('/ssr')}>
          Router to SSR
        </Button>
      </Flex>
    </Layout>
  )
}

export default Ssg
