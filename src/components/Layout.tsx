import { Box, Flex, Text } from '@artsy/palette'
import React from 'react'
import { Header } from './Header'

export const Layout = ({ children }) => {
  return (
    <Flex flexDirection="column" style={{ minHeight: '100%' }}>
      <Box flexShrink="0" as="header">
        <Header />
      </Box>
      <Box flex="1 0 auto" px={[4, 2]}>
        <main>{children}</main>
      </Box>

      <Box mx={[4, 2]} my={[2.1]} as="footer" height="40px" flexShrink="0">
        <Flex
          justifyContent="flex-end"
          alignItems="center"
          as="a"
          href="https://github.com/artsy/hack8-next-prediction"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Text mr={1}>Powered by:</Text>
          <img
            src="/vercel.svg"
            alt="Vercel Logo"
            className="logo"
            style={{ height: '20px' }}
          />
        </Flex>
      </Box>
    </Flex>
  )
}
