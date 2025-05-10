import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsString,
} from "nuqs/server"

export const searchParams = {
  type: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  university: parseAsString
    .withOptions({ clearOnDefault: true })
    .withDefault(""),
  month: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  season: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  priceMin: parseAsInteger.withOptions({ clearOnDefault: true }).withDefault(0),
  priceMax: parseAsInteger
    .withOptions({ clearOnDefault: true })
    .withDefault(200000),
  page: parseAsInteger.withOptions({ clearOnDefault: true }).withDefault(1),
  sort: parseAsString
    .withOptions({ clearOnDefault: true })
    .withDefault("popular"),
}

export const searchParamsCache = createSearchParamsCache(searchParams)
export const serialize = createSerializer(searchParams)
