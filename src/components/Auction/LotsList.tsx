import React, { useEffect, useState } from 'react'
import { BorderBox, Box, Flex, Text, Link } from '@artsy/palette'

import { LotNav } from './LotNav'

import { Lot, Sale } from '../Types'
interface Props {
  lots: Array<Lot>
  saleSlug: Sale['slug']
  lotStandings: Array<{
    id: string
    isHighestBidder: boolean
    leadingBidAmount: { displayAmount: string }
    lotState: { internalID: string }
  }>
}

export const LotsList: React.FC<Props> = ({ lots, saleSlug, lotStandings }) => {
  const [filter, setFilter] = useState<'UPCOMING' | 'PREVIOUS' | 'BIDS'>(
    'UPCOMING'
  )
  const [visibleLots, setVisibleLots] = useState(lots)
  const lotStandingIds = lotStandings.map((ls) => ls.lotState.internalID)

  useEffect(() => {
    switch (filter) {
      case 'UPCOMING':
        setVisibleLots(lots)
        break
      case 'PREVIOUS':
        setVisibleLots([])
        break
      case 'BIDS':
        console.log({ lotStandingIds, ids: lots.map((l) => l.internalID) })
        setVisibleLots(
          lots.filter((l) => lotStandingIds.includes(l.internalID))
        )
        break
    }
  }, [filter, lots])

  return (
    <>
      <BorderBox
        flexDirection="row"
        justifyContent="space-between"
        borderRadius={0}
        borderX="none"
      >
        <Text variant="mediumText">LOTS</Text>
        <Flex>
          <Link
            href="#"
            underlineBehavior="none"
            color={filter ? 'purple100' : 'black60'}
            hoverColor="purple100"
            mx={0.5}
            onClick={() => {
              setFilter('UPCOMING')
            }}
          >
            <Text variant="mediumText">UPCOMING</Text>
          </Link>
          <Link
            href="#"
            underlineBehavior="none"
            color={!filter ? 'purple100' : 'black60'}
            hoverColor="purple100"
            mx={0.5}
            onClick={() => {
              setFilter('PREVIOUS')
            }}
          >
            <Text variant="mediumText">PREVIOUS</Text>
          </Link>
          <Link
            href="#"
            underlineBehavior="none"
            color={!filter ? 'purple100' : 'black60'}
            hoverColor="purple100"
            mx={0.5}
            onClick={() => {
              setFilter('BIDS')
            }}
          >
            <Text variant="mediumText">BIDS</Text>
          </Link>
        </Flex>
      </BorderBox>
      <Box overflowY="scroll">
        {visibleLots.map((lot) => (
          <LotNav key={lot.internalID} lot={lot} saleSlug={saleSlug} />
        ))}
      </Box>
    </>
  )
}
