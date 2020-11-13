import React from 'react'
import { Box, Button, Flex, Image, Text } from '@artsy/palette'
import Link from 'next/link'
import styled from 'styled-components'

import { GavelIcon } from '../Icons'

import { Lot, Sale } from '../Types'
interface Props {
  currentLot: Lot
  isActive: boolean
  saleSlug: Sale['slug']
}

export const CurrentLotCard: React.FC<Props> = ({
  currentLot,
  isActive,
  saleSlug,
}) => {
  if (!currentLot) return null
  return (
    <Box
      p={3}
      bg={isActive ? 'white100' : 'black100'}
      color={!isActive ? 'white100' : 'black100'}
    >
      <Flex justifyContent="space-between" mb={3}>
        <Text variant="mediumText">CURRENT LOT</Text>
        <Text variant="mediumText" color={isActive ? 'purple100' : 'white100'}>
          {currentLot.lotLabel}
        </Text>
      </Flex>
      <Flex
        flexDirection="row"
        alignItems="center"
        position="relative"
        justifyContent="space-between"
      >
        <ImageNC
          height="50px"
          width="50px"
          lazyLoad
          src={currentLot.artwork.image.url}
        />
        <Flex flexDirection="column" mx={3}>
          <Text variant="mediumText" color="black60">
            {currentLot.artwork.artist?.name}
          </Text>
          <Text variant="title">{currentLot.increments[0].display}</Text>
        </Flex>
        <GavelIcon fill={!isActive ? 'white100' : 'purple100'} />
      </Flex>
      {!isActive && (
        <Link href={`/auctions/${saleSlug}?lot=${currentLot.internalID}`}>
          <Button block width="100%" variant="primaryWhite" mt={1}>
            GO BACK TO LIVE LOT
          </Button>
        </Link>
      )}
    </Box>
  )
}

const ImageNC = styled(Image)`
  flex: none;
  img {
    object-fit: cover;
  }
`
