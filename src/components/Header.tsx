import { useUser } from '../lib/auth/hooks'
import Link from 'next/link'
import React from 'react'
import { ArtsyMarkIcon, Box, Flex, Text } from '@artsy/palette'

const NavLink = ({ href, children }): JSX.Element => (
  <Link href={href}>
    <Text style={{ cursor: 'pointer' }} as="a">
      {children}
    </Text>
  </Link>
)

export const Header = () => {
  const user = useUser()

  return (
    <Flex
      my={1}
      mx={[3, 2]}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      as="nav"
    >
      <Box mr="auto">
        <Link href="/">
          <a>
            <ArtsyMarkIcon height={40} width={40} name="Artsy" />
          </a>
        </Link>
      </Box>
      {user && (
        <Flex
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box mr={2}>
            <NavLink href="/dashboard">Dashboard</NavLink>
          </Box>
          {/*
              <Box mr={2}>
                <NavLink href="/gravity">Gravity example</NavLink>
              </Box>
              <Box mr={2}>
                <NavLink href="/metaphysics">Metaphysics example</NavLink>
              </Box>
              <Box mr={2}>
                <NavLink href="/artist-series">Artist series</NavLink>
              </Box>
              */}
        </Flex>
      )}

      {
        <Box ml="auto">
          <NavLink href={user ? '/api/logout' : '/login'}>
            {user ? 'Log out' : 'Login'}
          </NavLink>
        </Box>
      }
    </Flex>
  )
}
