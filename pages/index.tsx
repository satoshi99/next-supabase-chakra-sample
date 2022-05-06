import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { FormEvent, useState } from 'react'
import { Layout } from '../components/Layout'
import { useMutateAuth } from '../hooks/useMutateAuth'

const Auth: NextPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    registerMutation,
  } = useMutateAuth()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      loginMutation.mutate()
    } else {
      registerMutation.mutate()
    }
  }

  const handleLoginState = () => {
    setIsLogin(!isLogin)
  }

  return (
    <Layout title="Auth">
      <form onSubmit={handleSubmit}>
        <Stack spacing="8">
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading>
              {isLogin ? 'Log in to your account' : 'Register new account'}
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">
                {isLogin
                  ? `Don't have an account?`
                  : 'Aready have an account ?'}
              </Text>
              <Button
                variant="link"
                colorScheme="blue"
                onClick={handleLoginState}
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </Button>
            </HStack>
          </Stack>

          <Stack spacing="5">
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </Stack>
          <Button type="submit" variant="solid" colorScheme="teal">
            {isLogin ? 'Log in' : 'Sign up'}
          </Button>
        </Stack>
      </form>
    </Layout>
  )
}

export default Auth
