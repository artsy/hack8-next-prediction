import React from 'react'
import { Box, ChevronIcon, color, Flex, Image, Text } from '@artsy/palette'
import Link from 'next/link'
import styled from 'styled-components'

import { Auction } from './Types'
interface Props {
  auction: Auction
}

export const AuctionLink: React.FC<Props> = ({ auction }) => {
  const { slug, name, status, coverImage } = auction
  return (
    <Link href={`/auctions/${slug}`}>
      <FlexLink
        p={2}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex alignItems="center">
          <Image
            mr={2}
            width="50px"
            height="50px"
            src={coverImage.url}
            alt="Please make sure you describe the image"
          />
          <Box>
            <Text variant="subitle" mb={0.5}>
              {name}
            </Text>
            <Text>{status}</Text>
          </Box>
        </Flex>
        <ChevronIcon fill="black60" height="21px" width="21px" />
      </FlexLink>
    </Link>
  )
}

const FlexLink = styled(Flex)`
  cursor: pointer;
  &:hover {
    background-color: ${color('black5')};
  }
`
