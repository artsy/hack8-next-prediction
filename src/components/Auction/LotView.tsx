import React, { useEffect, useState } from 'react'
import {
  ArrowRightIcon,
  Button,
  CloseIcon,
  Flex,
  Image,
  Link,
  ResponsiveBox,
  Text,
} from '@artsy/palette'
import styled from 'styled-components'

import { LotDetails } from './LotInfo'

import { Lot, Sale } from '../Types'
interface Props {
  lot: Lot
  buyersPremium: Sale['buyersPremium']
}

export const LotView: React.FC<Props> = ({ lot, buyersPremium }) => {
  if (!lot) return null
  const [artworkSrc, setArtworkSrc] = useState('')
  const [mainView, setMainView] = useState(true)
  useEffect(() => {
    setArtworkSrc(lot.artwork.image.url)
    setMainView(true)
  }, [lot])

  const toggleMainView = () => {
    setMainView(!mainView)
  }
  return (
    <Flex
      alignItems="center"
      flexDirection="column"
      flex={1}
      alignSelf={mainView ? 'auto' : 'baseline'}
    >
      {mainView && (
        <>
          <ResponsiveBox
            aspectWidth={500}
            aspectHeight={500}
            maxWidth="100%"
            bg="black5"
          >
            <Image
              height="100%"
              src="https://picsum.photos/seed/hello/700/400"
              srcSet={artworkSrc}
              alt="Please make sure you describe the image"
              preventRightClick
              lazyLoad
            />
          </ResponsiveBox>
          <Button
            my={3}
            variant="secondaryOutline"
            size="medium"
            onClick={toggleMainView}
          >
            LOT INFORMATION
          </Button>
        </>
      )}
      {!mainView && (
        <>
          <Flex justifyContent="space-between" width="100%">
            <Flex alignItems="center">
              <Image
                height="130px"
                width="130px"
                src="https://picsum.photos/seed/hello/700/400"
                srcSet={artworkSrc}
                alt="Please make sure you describe the image"
                mr={3}
                preventRightClick
                lazyLoad
              />
              <LotDetails
                lot={lot}
                buyersPremium={buyersPremium}
                /*condensed={false}*/
                includeEstimates={false}
              />
            </Flex>
            <Link href="#" underlineBehavior="none" onClick={toggleMainView}>
              <CloseIcon width="24px" height="39px" />
            </Link>
          </Flex>
          <StyledLink
            target="_blank"
            href="https://www.artsy.net/"
            underlineBehavior="none"
            hoverColor="purple100"
            mt={30}
          >
            <Text variant="mediumText">
              VIEW {lot.artwork.artist?.name.toUpperCase()} ON ARTSY
            </Text>
            <ArrowRightIcon />
          </StyledLink>
        </>
      )}
    </Flex>
  )
}

const StyledLink = styled(Link)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  display: flex;
`
