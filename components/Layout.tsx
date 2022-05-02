import { FC, ReactNode } from 'react'
import Head from 'next/head'
import { Flex } from '@chakra-ui/react'

type Title = {
  title: string
  children: ReactNode
}

export const Layout: FC<Title> = ({ children, title = 'Todo app' }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />

        <title>{title}</title>
        <meta name="description" content="Next.js and Supabase sample app." />
        <meta name="keywords" content="Next.js,Supabase" />
        <meta name="author" content="Satoshi" />
      </Head>
      <header></header>
      <main>
        <Flex
          direction="column"
          minH="100vh"
          align="center"
          justify="center"
          fontFamily="sans-serif"
        >
          {children}
        </Flex>
      </main>
      <footer></footer>
    </>
  )
}
