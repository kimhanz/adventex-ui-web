import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

function PaginationControls({ numPages }: { numPages: number }) {
  return (
    <Pagination className="items-center gap-2">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            // aria-disabled={page === 1}
            // href={pageURL(page - 1)}
            className="aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            aria-label="Previous page"
            aria-hidden="true"
          />
        </PaginationItem>

        {Array.from({ length: numPages }, (_, i) => (
          <PaginationItem key={i}>
            {/* <PaginationLink href={pageURL(i + 1)} isActive={page === i + 1}> */}
            <PaginationLink>{i + 1}</PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            // aria-disabled={page === numPages}
            // href={pageURL(page + 1)}
            className="aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            aria-label="Next page"
            aria-hidden="true"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export { PaginationControls }
