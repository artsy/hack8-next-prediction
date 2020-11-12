import React from 'react'
import { BorderBox, Box, Flex, Text, Tooltip } from '@artsy/palette'

import { PaddleIcon } from '../Icons'

import { Lot } from '../Types'
interface Props {
  lot: Lot
}

interface DetailsProps extends Props {
  includeEstimates?: boolean
  condensed?: boolean
}

export const LotDetails: React.FC<DetailsProps> = ({
  lot,
  condensed,
  includeEstimates,
}) => {
  const { artwork, symbol } = lot
  return (
    <Box>
      <Box>
        <Text variant="mediumText">{lot?.artist?.name}</Text>
        <Text variant="text" color="black60">
          {artwork.title}, {artwork.date}
        </Text>
        <Text variant="text" color="black60">
          {artwork.medium}
        </Text>
        <Text variant="text" color="black60">
          {artwork.dimensions.in} in
        </Text>
        <Text variant="text" color="black60">
          {artwork.dimensions.cm} cm
        </Text>
      </Box>
      {includeEstimates && (
        <BorderBox
          justifyContent="space-between"
          py={1}
          px={0}
          mt={3}
          borderStyle="dotted"
          borderRadius={0}
          borderX="none"
        >
          <Text variant="text">Estimate:</Text>
          <Text variant="text">
            {symbol}
            {lot.lowEstimate.cents}–{symbol}
            {lot.highEstimate.cents}
          </Text>
        </BorderBox>
      )}
      <Box mt={1}>
        <Text variant="text">
          <Tooltip
            content={
              <>
                <Text>
                  On the hammer price up to and including USD200,000: 25
                </Text>
                <Text>
                  On the portion of the hammer price in excess of USD200,000:
                  20%
                </Text>
              </>
            }
          >
            <Text variant="text" color="black60">
              This work has a <b>Buyer’s Premium</b>
            </Text>
          </Tooltip>
        </Text>
      </Box>
    </Box>
  )
}

export const LotInfo: React.FC<Props> = ({ lot }) => {
  if (!lot) return null
  return (
    <Box p={3}>
      <Text variant="mediumText" mb={3}>
        LOT {lot.lotLabel}
      </Text>
      <LotDetails lot={lot} condensed={true} includeEstimates={true} />
      <Flex justifyContent="space-between" mt={3}>
        <Flex>
          <PaddleIcon />
          <Text variant="mediumText" ml={1}>
            BID COUNT
          </Text>
        </Flex>
        <Text variant="mediumText" color="purple100">
          {lot.bidCount || 0}
        </Text>
      </Flex>
    </Box>
  )
}
