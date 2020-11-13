import {
  RelayNetworkLayer,
  urlMiddleware,
} from 'react-relay-network-modern/node8'
import RelaySSR from 'react-relay-network-modern-ssr/node8/server'
import { Network, Environment, RecordSource, Store } from 'relay-runtime'
// import { fetchJwt } from './fetchJwt'

export default {
  initEnvironment: () => {
    const source = new RecordSource()
    const store = new Store(source)
    const relaySSR = new RelaySSR()

    return {
      relaySSR,

      environment: new Environment({
        store,
        network: new RelayNetworkLayer([
          urlMiddleware({
            url: `/api/causality-graphql`,
            method: 'POST',
            headers: {
              // FIXME: This hard-coded admin jwt cannot be used on client, how to add it from the user? Set it in cookie with access token?
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_CAUSALITY_TEMP_JWT}`,
              // 'content-type': 'application/json',
            },
          }),

          relaySSR.getMiddleware(),
        ]),
      }),
    }
  },
  createEnvironment: (relayData) => {
    const source = new RecordSource()
    const store = new Store(source)

    return new Environment({
      store,
      network: Network.create(() => relayData?.[0][1] || Promise.resolve()),
    })
  },
}
