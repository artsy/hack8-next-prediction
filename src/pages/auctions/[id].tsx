import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import {
  BorderBox,
  Button,
  color,
  Column,
  Flex,
  GridColumns,
  Link as HyperLink,
  Text,
} from '@artsy/palette'

import { metaphysicsFetcher } from 'lib/auth/hooks/metaphysics'
import {
  CurrentLotCard,
  LotInfo,
  LotsList,
  LotView,
  Header,
} from 'components/Auction'

// These IS all for the sake of testing
const lotIdx = 1

import { Sale } from 'components/Types'

const Auction: React.FC<{ sale: Sale }> = (props) => {
  const router = useRouter()

  const { sale } = props
  const lots =
    sale?.saleArtworksConnection?.edges?.map(({ node }) => node) || []
  const currentLot = lots[0] || null
  const [selectedLot, setSelectedLot] = useState(currentLot)

  useEffect(() => {
    console.log('useeffect')
    const newLot = lots.find((lot) => router.query.lot === lot.internalID)
    if (newLot) setSelectedLot(newLot)
  }, [router.query.lot, lots])

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return (
      <Flex height="100%" justifyContent="center" alignItems="center">
        <pre>Loading...</pre>
      </Flex>
    )
  }

  const isActive = router.query.lot === currentLot?.internalID

  return (
    <GridColumns position="relative" gridColumnGap={0} height="100%">
      <Column span={3} display="flex" flexDirection="column" overflow="hidden">
        <Header title={sale?.name} count={lots.length} completed={lotIdx} />
        {currentLot && (
          <CurrentLotCard
            currentLot={currentLot}
            isActive={isActive}
            saleSlug={sale?.slug}
          />
        )}
        <LotsList lots={lots} saleSlug={sale?.slug} />
      </Column>

      <Column
        span={6}
        borderX={`1px solid ${color('black10')}`}
        p={3}
        display="flex"
        alignItems="center"
      >
        {selectedLot && <LotView lot={selectedLot} />}
      </Column>

      <Column span={3}>
        <LotInfo lot={selectedLot} />
        <BorderBox
          flexDirection="column"
          alignItems="center"
          borderRadius={0}
          borderX="none"
        >
          <Button disabled>REGISTRATION CLOSED</Button>
          <Text variant="small" color="black60" mt={1}>
            Already registered for this sale?{' '}
            <Link href="/login">
              <LinkContent>Log In</LinkContent>
            </Link>
          </Text>
        </BorderBox>
      </Column>
    </GridColumns>
  )
}

const LinkContent = styled(HyperLink)`
  cursor: pointer;
`

export const getStaticProps = async ({ params: { id } }) => {
  console.log('GSP')
  try {
    const res = await metaphysicsFetcher({
      query: graphqlQuery,
      variables: { SaleId: id },
      xappToken: process.env.NEXT_PUBLIC_ARTSY_XAPP_TOKEN,
    })
    console.log(res.sale)
    // TODO: delete this once connection is working right
    return {
      props: {
        sale: { ...res.sale },

        // auction,
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every second
      revalidate: 60, // In seconds
      // notFound: !res.status(200)
    }
  } catch (error) {
    console.error(error)
    return {
      notFound: true,
    }
  }
  // const auction = await res.json()
}

export async function getStaticPaths() {
  // // Call an external API endpoint to get posts
  // const res = await fetch('https://.../posts')
  // const posts = await res.json()
  //
  // // Get the paths we want to pre-render based on posts
  // const paths = posts.map((post) => ({
  //   params: { id: post.id },
  // }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths: [], fallback: true }
}

export default Auction

const graphqlQuery = `
  query GetSaleQuery($SaleId: String!) {
    sale(id: $SaleId) {
      internalID
      slug
      name
      description
      currency
      startAt
      liveStartAt
      endAt
      isClosed
      registrationEndsAt
      isLiveOpen
      buyersPremium {
        amount
        percent
      }
      saleArtworksConnection(all: true) {
        edges {
          node {
            internalID
            slug
            lotLabel
            increments {
              cents
              display
            }
            lowEstimate {
              cents
            }
            highEstimate {
              cents
            }
            symbol
            currency
            estimate
            reserveStatus
            reserve {
              cents
            }
            artwork {
              id
              title
              date
              medium
              category
              description
              dimensions {
                in
                cm
              }
              editionOf
              partner(shallow: true) {
                id
                name
                profile {
                  icon {
                    url
                  }
                }
              }
              artist(shallow: true) {
                name
                id
              }
              image {
                width
                height
                url(version: "large")
              }
            }
          }
        }
      }
    }
  }
`
