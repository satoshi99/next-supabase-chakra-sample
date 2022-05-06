import { Box, Button, Flex, HStack, Stack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { Layout } from '../components/Layout'
import { supabase } from '../utils/supabase'

const Dashboard: NextPage = () => {
  const signOut = () => {
    supabase.auth.signOut()
  }
  return (
    <Layout title="Dashboard">
      <Stack direction="column">
        <Button
          variant="link"
          onClick={signOut}
          position="absolute"
          top="10"
          left="10"
        >
          Log out
        </Button>
        <HStack direction="row" gap="10">
          <Box>todo</Box>
          <Box>todo</Box>
        </HStack>
        <Flex direction="row" gap="10"></Flex>
      </Stack>
    </Layout>
  )
}

export default Dashboard
