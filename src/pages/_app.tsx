import { Theme } from '@artsy/palette'
import { createEnvironment } from 'lib/causality/createEnvironment'
import React from 'react'
import { RelayEnvironmentProvider } from 'relay-hooks'
import '../styles.css'

export default function App({ Component, pageProps }) {
  console.log({ pageProps })
  return (
    /* Our causality relay environment */
    /*
     */
    <RelayEnvironmentProvider
      environment={createEnvironment(pageProps.relayData)}
    >
      <Theme>
        <Component {...pageProps} />
      </Theme>
    </RelayEnvironmentProvider>
    /*
     */
  )
}
