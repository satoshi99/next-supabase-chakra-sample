import { Flex } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { Layout } from '../components/Layout'

const Home: NextPage = () => {
  return (
    <>
      <Layout title="Home">
        <Flex>Hello</Flex>
      </Layout>
    </>
  )
}

export default Home
