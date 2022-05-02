import {
  Button,
  Flex,
  Heading,
  Link,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { Layout } from '../components/Layout'
import { Notice, Task } from '../types/types'
import { supabase } from '../utils/supabase'

export const getStaticProps: GetStaticProps = async () => {
  console.log('getStaticProps/ssg invoked')
  const { data: tasks } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: true })
  const { data: notices } = await supabase
    .from('notices')
    .select('*')
    .order('created_at', { ascending: true })

  return { props: { tasks, notices } }
}

type StaticProps = {
  tasks: Task[]
  notices: Notice[]
}

const Ssg: NextPage<StaticProps> = ({ tasks, notices }) => {
  const router = useRouter()
  const onClick = () => {
    router.push('/ssr')
  }
  return (
    <Layout title="SSG">
      <Heading mb="14" textColor="teal">
        Data Fetching with SSG (Server-side rendering)
      </Heading>
      <Flex direction="row" gap="10">
        <TableContainer>
          <Table variant="striped" colorScheme="gray">
            <TableCaption>Todo list</TableCaption>
            <Thead>
              <Tr>
                <Th>Add Date</Th>
                <Th>Todos</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tasks?.map((task) => (
                <Tr key={task.id}>
                  <Td>{task.created_at}</Td>
                  <Td>{task.title}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <TableContainer>
          <Table variant="striped" colorScheme="gray">
            <TableCaption>Notice list</TableCaption>
            <Thead>
              <Tr>
                <Th>Add Date</Th>
                <Th>Notices</Th>
              </Tr>
            </Thead>
            <Tbody>
              {notices?.map((notice) => (
                <Tr key={notice.id}>
                  <Td>{notice.created_at}</Td>
                  <Td>{notice.content}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      <Flex direction="column" my="10" align="center">
        <NextLink href="/ssr" prefetch={false} passHref>
          <Link mb="5" color="blue">
            Link to SSR
          </Link>
        </NextLink>
        <Button colorScheme="orange" onClick={onClick}>
          Router to SSR
        </Button>
      </Flex>
    </Layout>
  )
}

export default Ssg
