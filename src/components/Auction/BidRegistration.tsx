import React from 'react'
import { BorderBox, Button, Link as HyperLink, Text } from '@artsy/palette'
import Link from 'next/link'
import styled from 'styled-components'

import { useUser } from '../../lib/auth/hooks'

interface Props {
  currency: string
  hasEnded?: boolean
}

export const BidRegistration: React.FC<Props> = ({ currency, hasEnded }) => {
  const user = useUser()
  return (
    <BorderBox
      flexDirection="column"
      alignItems="center"
      borderRadius={0}
      borderX="none"
    >
      <Button block width="100%" disabled={hasEnded}>
        {hasEnded ? 'REGISTRATION CLOSED' : 'REGISTER TO BID'}
      </Button>
      <Text variant="small" color="black60" mt={1} alignSelf="flex-start">
        {!user ? <LogInCTA /> : `Currency in ${currency}`}
      </Text>
    </BorderBox>
  )
}

const LogInCTA = () => (
  <>
    Already registered for this sale?&nbsp;
    <Link href="/login">
      <LinkContent>Log In</LinkContent>
    </Link>
  </>
)

const LinkContent = styled(HyperLink)`
  cursor: pointer;
`
