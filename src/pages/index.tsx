import { Text } from '@artsy/palette'
import { Layout } from 'components/Layout'
import Head from 'next/head'

export const Home = (): JSX.Element => {
  return (
    <Layout>
      <Head>
        <title>Next Prediction</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Text as="h1" variant="heading" className="title">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </Text>

        <p className="description">
          Get started by editing <code>pages/index.tsx</code>
        </p>

        <button
          onClick={() => {
            window.alert('With typescript and Jest')
          }}
        >
          Test Button
        </button>

        <div className="grid">
          <a href="https://nextjs.org/docs" className="card">
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className="card">
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className="card"
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="card"
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>
    </Layout>
  )
}
export default Home
