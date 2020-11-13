import React from 'react'
import { BorderBox, Box, Flex, Text, Tooltip } from '@artsy/palette'

import { PaddleIcon } from '../Icons'

import { Lot, Sale } from '../Types'
interface Props {
  lot: Lot
  buyersPremium: Sale['buyersPremium']
}

interface DetailsProps extends Props {
  includeEstimates?: boolean
  // condensed?: boolean //to be used in the future to show/hide extra info
}

export const LotDetails: React.FC<DetailsProps> = ({
  lot,
  // condensed,
  includeEstimates,
  buyersPremium,
}) => {
  const { artist, title, date, medium, dimensions } = lot.artwork
  const premiumPrice = buyersPremium && buyersPremium[1].amount
  return (
    <Box>
      <Box>
        <Text variant="mediumText">{artist?.name}</Text>
        <Text variant="text" color="black60">
          {title}, {date}
        </Text>
        <Text variant="text" color="black60">
          {medium}
        </Text>
        <Text variant="text" color="black60">
          {dimensions.in}
        </Text>
        <Text variant="text" color="black60">
          {dimensions.cm}
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
          <Text variant="text">{lot.estimate}</Text>
        </BorderBox>
      )}
      {!!buyersPremium && (
        <Box mt={1}>
          <Text variant="text">
            <Tooltip
              content={
                <>
                  <Text>
                    On the hammer price up to and including {premiumPrice}:{' '}
                    {buyersPremium[0].percent * 100}%.
                  </Text>
                  <Text>
                    On the portion of the hammer price in excess of{' '}
                    {premiumPrice}: {buyersPremium[1].percent * 100}%.
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
      )}
    </Box>
  )
}

export const LotInfo: React.FC<Props> = ({ lot, buyersPremium }) => {
  if (!lot) return null
  return (
    <Box p={3}>
      <Text variant="mediumText" mb={3}>
        LOT {lot.lotLabel}
      </Text>
      <LotDetails
        lot={lot}
        buyersPremium={buyersPremium}
        /*condensed={true}*/
        includeEstimates={true}
      />
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
