import {
  createLoader,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server"

const sortValues = ["popular", "time", "price"] as const

export const searchParams = {
  type: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  university: parseAsString
    .withOptions({ clearOnDefault: true })
    .withDefault(""),
  month: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  season: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  minPrice: parseAsInteger.withOptions({ clearOnDefault: true }).withDefault(0),
  maxPrice: parseAsInteger
    .withOptions({ clearOnDefault: true })
    .withDefault(200000),
  sort: parseAsStringLiteral(sortValues).withDefault("popular"),
}

export const loadTourStudiesFilters = createLoader(searchParams)
