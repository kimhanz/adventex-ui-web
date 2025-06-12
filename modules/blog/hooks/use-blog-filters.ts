import { parseAsInteger, parseAsString, useQueryStates } from "nuqs"

const blogFiltersParser = {
  page: parseAsInteger.withDefault(1),
  category: parseAsString,
  tag: parseAsString,
}

export function useBlogFilters() {
  return useQueryStates(blogFiltersParser)
}
