import React, { useEffect, useState } from 'react'
import { BorderBox, Box, Flex, Text, Link } from '@artsy/palette'

import { LotNav } from './LotNav'

import { Lot, Sale } from '../Types'
interface Props {
  lots: Array<Lot>
  saleSlug: Sale['slug']
}

export const LotsList: React.FC<Props> = ({ lots, saleSlug }) => {
  const [upcomingActive, setUpcomingActive] = useState(true)
  const [visibleLots, setVisibleLots] = useState(lots)

  useEffect(() => {
    setVisibleLots(upcomingActive ? lots : [])
  }, [upcomingActive, lots])

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
            color={upcomingActive ? 'purple100' : 'black60'}
            hoverColor="purple100"
            mx={0.5}
            onClick={() => {
              setUpcomingActive(true)
            }}
          >
            <Text variant="mediumText">UPCOMING</Text>
          </Link>
          <Link
            href="#"
            underlineBehavior="none"
            color={!upcomingActive ? 'purple100' : 'black60'}
            hoverColor="purple100"
            mx={0.5}
            onClick={() => {
              setUpcomingActive(false)
            }}
          >
            <Text variant="mediumText">PREVIOUS</Text>
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
