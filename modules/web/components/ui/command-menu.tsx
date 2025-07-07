"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "@uidotdev/usehooks"
import { Circle, File } from "lucide-react"
import { useTRPC } from "@/trpc/client"

import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Skeleton } from "@/components/ui/skeleton"

function CommandMenu({
  ...props
}: {
  children?: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?(open: boolean): void
  modal?: boolean
}) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const debouncedQuery = useDebounce(query, 500)

  const trpc = useTRPC()
  const { data: searchResults, isLoading } = useQuery(
    trpc.tours.search.queryOptions(
      { query: debouncedQuery },
      { enabled: debouncedQuery.length > 0 }
    )
  )

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <React.Fragment>
      <Button
        variant="outline"
        className={cn(
          "bg-muted/50 text-muted-foreground relative h-8 w-full justify-start rounded-lg text-sm font-normal shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">ค้นหาสิ่งที่คุณต้องการ...</span>
        <span className="inline-flex lg:hidden">ค้นหา...</span>
        <kbd className="bg-muted pointer-events-none absolute top-[0.3rem] right-[0.3rem] hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:flex">
          <span className="text-xs">/</span>
        </kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
      >
        <CommandInput
          placeholder="พิมพ์คำสั่งหรือค้นหา..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>ไม่พบผลลัพธ์</CommandEmpty>
          {isLoading && (
            <div className="p-4">
              <Skeleton className="h-12 w-full" />
            </div>
          )}
          {!debouncedQuery && (
            <CommandGroup heading="Links">
              {docsConfig.mainNav
                .filter((navitem) => !navitem.external)
                .map((navItem) => (
                  <CommandItem
                    key={navItem.href}
                    value={navItem.title}
                    onSelect={() =>
                      runCommand(() => router.push(navItem.href as string))
                    }
                  >
                    <File />
                    {navItem.title}
                  </CommandItem>
                ))}
            </CommandGroup>
          )}
          {searchResults?.tourStudies &&
            searchResults.tourStudies.length > 0 && (
              <CommandGroup heading="Tour Studies">
                {searchResults.tourStudies.map((navItem) => (
                  <CommandItem
                    key={navItem.id}
                    value={navItem.name}
                    onSelect={() =>
                      runCommand(() =>
                        router.push(`/tours/studies/${navItem.code}`)
                      )
                    }
                  >
                    <div className="mr-2 flex size-4 items-center justify-center">
                      <Circle className="size-3" />
                    </div>
                    {navItem.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          {searchResults?.tourTravels &&
            searchResults.tourTravels.length > 0 && (
              <CommandGroup heading="Tour Travels">
                {searchResults.tourTravels.map((navItem) => (
                  <CommandItem
                    key={navItem.id}
                    value={navItem.name}
                    onSelect={() =>
                      runCommand(() =>
                        router.push(`/tours/travels/${navItem.code}`)
                      )
                    }
                  >
                    <div className="mr-2 flex size-4 items-center justify-center">
                      <Circle className="size-3" />
                    </div>
                    {navItem.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
        </CommandList>
      </CommandDialog>
    </React.Fragment>
  )
}

export { CommandMenu }
