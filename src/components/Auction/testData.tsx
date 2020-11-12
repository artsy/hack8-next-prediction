// NOTE: THIS FILE IS FOR DEV PURPOSES ONLY AND SHOULD BE DELETED ONCE THE GRAPHQL QUERY IS FULLY SET UP

import { Lot } from "../Types"

const generateDummyLot = (idx: number): Lot => {
  return {
    internalID: Math.random().toString(36).substring(7).toString(),
    lotLabel: `${idx + 100}`,
    artist: {
      name: names[Math.floor(Math.random() * names.length)]
    },
    artwork: {
      title: titles[Math.floor(Math.random() * titles.length)],
      date: Math.floor(Math.random() * 2020).toString(),
      medium: mediums[Math.floor(Math.random() * mediums.length)],
      dimensions: {
        in: `${Math.floor(Math.random() * 200)} x ${Math.floor(Math.random() * 200)}`,
        cm: `${Math.floor(Math.random() * 200)} x ${Math.floor(Math.random() * 200)}`,
      },
      image: { url: `https://via.placeholder.com/500/${getRandomColor()}` },
    },
    currentBid: `$${Math.floor(Math.random() * 999)},${Math.floor(Math.random() * 999)}`,
    lowEstimate: {
      cents: `${Math.floor(Math.random() * 99)},000`
    },
    highEstimate: {
      cents: `${Math.floor(Math.random() * 999)},000`
    },
    symbol: symbols[Math.floor(Math.random() * symbols.length)],
    bidCount: Math.floor(Math.random() * 30),
  }
}

export const generateDummyData = (amt: number): Array<Lot> => {
  const data = [...Array(amt)].map((a, b) => generateDummyLot(b))
  return data
}

const names = [
  "Al E.Gater",
  "Helen Hywater",
  "Amanda Lynn",
  "Herbie Hind",
  "Anita Room",
  "Holly Wood",
  "Arty Fischel",
  "Horace Cope",
  "Barry D.Hatchett",
  "Hugh Raye",
  "Ben Dover",
  "Ima Hogg",
  "Bennie Factor",
  "Iona Mink",
]

const mediums = [
  "Oil on canvas",
  "Chalk",
  "Charcoal",
  "Conté",
  "Crayon",
  "Graphite",
  "Ink",
  "Pastel",
  "Pixel",
  "Sketch",
  "Acrylic",
  "Watercolour",
]

const titles = [
  "Gentle",
  "Useless",
  "Scared",
  "Late",
  "Fry",
  "Frogs",
  "Society",
  "Boast",
  "One",
  "Equable",
  "Female",
  "Bottle",
  "Sprout",
  "Release",
  "Lunch",
  "Hulking",
  "Expensive",
  "Parallel",
  "Porter",
  "Crime",
]

const symbols = ["$", "£", "€"]

const getRandomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = ''
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
