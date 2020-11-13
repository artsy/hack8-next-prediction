import { Flex, Text, Join, Separator } from '@artsy/palette'
import { Layout } from 'components/Layout'
import Head from 'next/head'

import { AuctionLink } from 'components/AuctionLink'

const auctions = [
  {
    slug: 'rago-auctions-post-war-plus-contemporary-art-4',
    name: 'Rago Auctions: Post War + Contemporary Art',
    status: 'Live Bidding Open',
    coverImage: { url: 'https://via.placeholder.com/50/0000FF' },
  },
  {
    slug: 'heritage-signature-urban-art-3',
    name: 'Heritage: Urban Art',
    status: 'Live Bidding Open',
    coverImage: { url: 'https://via.placeholder.com/50/0FBEEF' },
  },
  {
    slug: 'next-prediction-test',
    name: 'Next Prediction Test',
    status: 'Live Bidding Open',
    coverImage: { url: 'https://via.placeholder.com/50/0FBEEF' },
  },
]

export const Home = (): JSX.Element => {
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
            {auctions.map((auction) => (
              <AuctionLink key={auction.slug} auction={auction} />
            ))}
          </Join>
          <Separator />
        </Flex>
      </main>
    </Layout>
  )
}

export default Home
