// NOTE: These are for dev purposes only
// TODO: Replace with actual types

export interface Lot {
  internalID: string
  lotLabel: string
  artist: { name: string }
  artwork: {
    title: string
    date: string
    medium: string
    dimensions: {
      in: string
      cm: string
    }
    image: { url: string }
  }
  currentBid: string
  lowEstimate: {
    cents: string
  }
  highEstimate: {
    cents: string
  }
  symbol: string
  bidCount: number
}

interface EdgeLike<T> {
  node: T
}

export interface Sale {
  internalID: string
  slug: string
  name: string
  saleArtworksConnection: {
    edges: Array<EdgeLike<Lot>>
  }
  fakeLots?: Array<Lot>
}
