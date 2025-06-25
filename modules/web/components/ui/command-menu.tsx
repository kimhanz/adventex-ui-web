"use client"

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Circle, File } from "lucide-react"

import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

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
        setOpen((open) => {
          return !open
        })
      }
    }

    document.addEventListener("keydown", down)
    return () => {
      return document.removeEventListener("keydown", down)
    }
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
        onClick={() => {
          return setOpen(true)
        }}
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
        <CommandInput placeholder="พิมพ์คำสั่งหรือค้นหา..." />
        <CommandList>
          <CommandEmpty>ไม่พบผลลัพธ์</CommandEmpty>
          <CommandGroup heading="Links">
            {docsConfig.mainNav
              .filter((navitem) => {
                return !navitem.external
              })
              .map((navItem) => {
                return (
                  <CommandItem
                    key={navItem.href}
                    value={navItem.title}
                    onSelect={() => {
                      runCommand(() => {
                        return router.push(navItem.href as string)
                      })
                    }}
                  >
                    <File />
                    {navItem.title}
                  </CommandItem>
                )
              })}
          </CommandGroup>
          {docsConfig.tourNav.map((group) => {
            return (
              <CommandGroup
                key={group.title}
                heading={group.title}
              >
                {group.items.map((navItem) => {
                  return (
                    <CommandItem
                      key={navItem.href}
                      value={navItem.title}
                      onSelect={() => {
                        runCommand(() => {
                          return router.push(navItem.href as string)
                        })
                      }}
                    >
                      <div className="mr-2 flex size-4 items-center justify-center">
                        <Circle className="size-3" />
                      </div>
                      {navItem.title}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            )
          })}
          {docsConfig.tourStudy.map((group) => {
            return (
              <CommandGroup
                key={group.title}
                heading={group.title}
              >
                {group.items.map((navItem) => {
                  return (
                    <CommandItem
                      key={navItem.href}
                      onSelect={() => {
                        runCommand(() => {
                          return router.push(navItem.href as string)
                        })
                      }}
                    >
                      <div className="flex h-full w-full">
                        <Image
                          src={navItem.image || "/placeholder.svg"}
                          alt={navItem.title}
                          height={128}
                          width={128}
                          className="mr-2 h-32 w-32 rounded-md object-cover"
                        />
                        <div className="flex h-full w-full flex-1 flex-col gap-y-4">
                          <span className="block text-sm font-medium">
                            {navItem.title}
                          </span>
                          <div className="flex flex-1 flex-row flex-wrap gap-x-2 gap-y-2">
                            <Badge
                              variant="outline"
                              className="text-xs"
                            >
                              {navItem.location}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="text-xs"
                            >
                              {navItem.university}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="text-xs"
                            >
                              {navItem.season}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="text-xs"
                            >
                              {navItem.locationTH}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="text-xs"
                            >
                              {navItem.universityTH}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="text-xs"
                            >
                              {navItem.seasonTH}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            )
          })}
        </CommandList>
      </CommandDialog>
    </React.Fragment>
  )
}

export { CommandMenu }
