import React from 'react'
import { metaphysicsFetcher } from 'lib/auth/hooks/metaphysics'
import { graphql } from 'react-relay'
import { useQuery } from 'relay-hooks'
import { Box, Flex, Text } from '@artsy/palette'
import { Layout } from 'components/Layout'

const auctionDataQuery = graphql`
  query Id_auctionDataQuery($saleId: ID!) {
    sale(id: $saleId) {
      lots {
        id
      }
    }
  }
`

const Debug = ({ value }): JSX.Element => (
  <Flex borderRadius={4} style={{ overflow: 'scroll' }} px={1} bg="black10">
    <Text height="300px" as="pre" fontFamily="courier">
      {JSON.stringify(value, null, 2)}
    </Text>
  </Flex>
)

export default function Auction(props) {
  console.warn('FFFF ' + process.env.NEXT_PUBLIC_CAUSALITY_TEMP_JWT)
  if (!props?.sale?.internalID) return null
  console.log({ props })
  const { error, props: auctionData } = useQuery(auctionDataQuery, {
    saleId: props.sale.internalID,
  })
  if (error) return <div>{error.message}</div>

  if (!auctionData) return <div>Loading</div>
  // console.log({ auctionData })
  // debugger
  return (
    <Layout>
      <Box p={4}>
        <h1>test</h1>
        <Debug value={{ props }} />
      </Box>
    </Layout>
  )
}

export const getStaticProps = async ({ params: { id } }) => {
  try {
    const res = await metaphysicsFetcher(`
      query GetSaleQuery {
        sale(id: "${id}") {
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
          saleArtworksConnection {
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
    `)
    return {
      props: {
        sale: res.sale,

        // auction,
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every second
      revalidate: 60, // In seconds
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
