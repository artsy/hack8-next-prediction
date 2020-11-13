import { Flex, Text, Join, Separator } from '@artsy/palette'
import { Layout } from 'components/Layout'
import Head from 'next/head'

import { metaphysicsFetcher } from 'lib/auth/hooks/metaphysics'

import { AuctionLink } from 'components/AuctionLink'
import { Auction } from 'components/Types'

export const Home: React.FC<{ auctions: Array<Auction> }> = ({
  auctions,
}): JSX.Element => {
  return (
    <Layout>
      <Head>
        <title>Next Prediction</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Flex flexDirection="column" maxWidth="800px" m={[0, 'auto']}>
          <Text variant="title" mb={2}>
            Current Live Auctions
          </Text>
          <Separator />
          <Join separator={<Separator />}>
            {auctions?.map((auction) => (
              <AuctionLink key={auction.slug} auction={auction} />
            ))}
          </Join>
          <Separator />
        </Flex>
      </main>
    </Layout>
  )
}

export const getStaticProps = async () => {
  try {
    const res = await metaphysicsFetcher({
      query,
      variables: {},
      xappToken: process.env.NEXT_PUBLIC_ARTSY_XAPP_TOKEN,
      v1: true,
    })
    return {
      props: { auctions: res.auctions },
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
}

const query = `
  query {
    auctions: sales(is_auction: true, sort: CREATED_AT_ASC, size: 7) {
      slug: id
      name
      isLiveOpen: is_live_open
      coverImage: cover_image {
        url
      }
    }
  }
`

export default Home
