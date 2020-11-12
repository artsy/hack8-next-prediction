import React from "react"
import { color, Flex, Image, Text } from "@artsy/palette"
import Link from "next/link"
import { useRouter } from "next/router"
import styled from "styled-components"

import { Lot, Sale } from "../Types"
interface Props {
  lot: Lot
  saleSlug: Sale["slug"]
}

export const LotNav: React.FC<Props> = ({ lot, saleSlug }) => {
  if (!lot) return null
  const router = useRouter()
  let active = router.query.lot === lot.internalID
  return (
    <Link href={`/auction/${saleSlug}?lot=${lot.internalID}`}>
      <FlexLink px={3} py={1} bg={ active ? "#fdefd1" : "white100" } flexDirection="row">
        <Image
          height="50px"
          width="50px"
          lazyLoad
          src={lot.artwork.image.url}
          mr={3}
        />
        <Flex flexDirection="column" color={ active ? "black100" : "black60" }>
          <Text variant="mediumText">LOT {lot.lotLabel}</Text>
          <Text variant="mediumText">{lot.artist.name}</Text>
        </Flex>
      </FlexLink>
    </Link>
  )
}

const FlexLink = styled(Flex)`
  cursor: pointer;
  &:hover {
    background-color: ${color("black5")};
  }
`
