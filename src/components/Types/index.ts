// NOTE: These are for dev purposes only
// TODO: Replace with actual types
interface Increment {
  cents: number
  display: string
}
export interface Lot {
  artwork: {
    artist: { name: string }
    date: string
    dimensions: {
      cm: string
      in: string
    }
    image: { url: string }
    medium: string
    title: string
  }
  bidCount: number
  currency: string
  currentBid: string
  estimate: string
  highEstimate: {
    cents: string
  }
  increments: Array<Increment>
  internalID: string
  lotLabel: string
  lowEstimate: {
    cents: string
  }
  symbol: string
}

interface EdgeLike<T> {
  node: T
}

interface Premium {
  amount: string
  percent: number
}

export interface Sale {
  buyersPremium: [Premium, Premium] | null
  internalID: string
  isClosed: boolean
  slug: string
  name: string
  saleArtworksConnection: {
    edges: Array<EdgeLike<Lot>>
  }
}
