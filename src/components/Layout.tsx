import { Box, Flex } from '@artsy/palette'
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
    </Flex>
  )
}
