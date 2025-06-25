import {
  createLoader,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server"

const sortValues = ["popular", "time", "price"] as const

export const searchParams = {
  destination: parseAsString
    .withOptions({ clearOnDefault: true })
    .withDefault(""),
  duration: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  minPrice: parseAsInteger.withOptions({ clearOnDefault: true }).withDefault(0),
  maxPrice: parseAsInteger
    .withOptions({ clearOnDefault: true })
    .withDefault(200000),
  sort: parseAsStringLiteral(sortValues).withDefault("popular"),
}

export const loadTourTravelsFilters = createLoader(searchParams)
