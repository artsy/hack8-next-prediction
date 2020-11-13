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
  type TabKey = 'UPCOMING' | 'PREVIOUS' | 'BIDS'
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
        setVisibleLots(
          lots.filter((l) => lotStandingIds.includes(l.internalID))
        )
        break
    }
  }, [filter, lots])

  const Tab = ({ name }: { name: TabKey }) => {
    return (
      <Link
        href="#"
        underlineBehavior="none"
        color={name === filter ? 'purple100' : 'black60'}
        hoverColor="purple100"
        mx={0.5}
        onClick={() => {
          setFilter(name)
        }}
      >
        <Text variant="mediumText">{name}</Text>
      </Link>
    )
  }

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
          <Tab name="UPCOMING" />
          <Tab name="PREVIOUS" />
          <Tab name="BIDS" />
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
