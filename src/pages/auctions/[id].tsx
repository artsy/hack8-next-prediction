import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { color, Column, Flex, GridColumns, Spinner } from '@artsy/palette'
import { metaphysicsFetcher } from 'lib/metaphysics'
import { graphql } from 'react-relay'
import { useQuery } from 'relay-hooks'

const auctionDataQuery = graphql`
  query Id_auctionDataQuery($saleId: ID!, $userId: ID!) {
    lotStandingConnection(userId: $userId) {
      edges {
        node {
          isHighestBidder
          leadingBidAmount {
            displayAmount
          }
          lotState {
            internalID
          }
        }
      }
    }
    sale(id: $saleId) {
      lots {
        id
        bidCount
      }
    }
  }
`

// const Debug = ({ value }): JSX.Element => (
//   <Flex
//     position="absolute"
//     borderRadius={4}
//     style={{ overflow: 'scroll' }}
//     px={1}
//     bg="black10"
//   >
//     <Text height="300px" as="pre" fontFamily="courier">
//       {JSON.stringify(value, null, 2)}
//     </Text>
//   </Flex>
// )

import {
  BidRegistration,
  CurrentLotCard,
  LotInfo,
  LotsList,
  LotView,
  Header,
} from 'components/Auction'

// These IS all for the sake of testing
const lotIdx = 1

import { Sale } from 'components/Types'
import { useUser } from 'lib/auth/hooks'

const Auction: React.FC<{ sale: Sale }> = ({ sale }) => {
  const router = useRouter()
  const user =
    useUser({
      redirectTo: `/login?redirectTo=${encodeURIComponent(router.asPath)}`,
    }) || {}

  const { userId } = user

  const lots =
    sale?.saleArtworksConnection?.edges?.map(({ node }) => node) || []

  const currentLot = lots[0] || null
  const [selectedLot, setSelectedLot] = useState(currentLot)

  useEffect(() => {
    const newLot = lots.find((lot) => router.query.lot === lot.internalID)
    if (newLot) setSelectedLot(newLot)
    if (!selectedLot || !router.query.lot) setSelectedLot(currentLot)
  }, [router.query.lot, lots])

  const { error: auctionDataError, props: auctionData } = useQuery<any>(
    auctionDataQuery,
    {
      saleId: sale?.internalID,
      userId,
    }
  )

  if (auctionDataError) {
    // some errors will happen because we shouldn't call api until the data is present 🤷‍♂️ but thats ok

    console.warn(auctionDataError)
  }

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  const isLoading = router.isFallback || !auctionData
  if (isLoading) {
    return (
      <Flex height="100%" justifyContent="center" alignItems="center">
        <Spinner size="large" />
      </Flex>
    )
  }

  console.warn({ auctionData })
  const lotStandings =
    auctionData?.lotStandingConnection?.edges?.map(({ node }) => node) || []

  const lotStates: any[] = auctionData.lots || []

  // never got around to using this for showing lot state in right column etc
  const _findLotState = (id: string) => lotStates.find((l) => l.id === id)

  const isActive =
    router.query.lot === currentLot?.internalID || !router.query.lot

  return (
    <GridColumns position="relative" gridColumnGap={0} height="100%">
      <Column span={3} display="flex" flexDirection="column" overflow="hidden">
        <Header title={sale?.name} count={lots.length} completed={lotIdx} />
        {currentLot && (
          <CurrentLotCard
            currentLot={currentLot}
            //
            isActive={isActive}
            saleSlug={sale?.slug}
          />
        )}
        <LotsList
          lots={lots}
          saleSlug={sale?.slug}
          lotStandings={lotStandings}
        />
      </Column>

      <Column
        span={6}
        borderX={`1px solid ${color('black10')}`}
        p={3}
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        {selectedLot && (
          <LotView buyersPremium={sale?.buyersPremium} lot={selectedLot} />
        )}

        {/* auctionData && <Debug value={auctionData} /> */}
      </Column>

      <Column span={3}>
        <LotInfo lot={selectedLot} buyersPremium={sale?.buyersPremium} />
        <BidRegistration
          currency={selectedLot?.currency}
          hasEnded={sale?.isClosed}
        />
      </Column>
    </GridColumns>
  )
}

export const getStaticProps = async ({ params: { id } }) => {
  try {
    const res = await metaphysicsFetcher({
      query: graphqlQuery,
      variables: { SaleId: id },
      xappToken: process.env.NEXT_PUBLIC_ARTSY_XAPP_TOKEN,
    })

    return {
      props: {
        sale: res.sale,
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every second
      revalidate: 600, // In seconds
      // notFound: !res.status(200)
    }
  } catch (error) {
    console.error({ error })
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
