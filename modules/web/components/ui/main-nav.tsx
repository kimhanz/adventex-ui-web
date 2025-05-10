"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { Icons } from "./icons"

type ListItemRef = React.ComponentRef<"a">

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string
}

const ListItem = React.forwardRef<ListItemRef, ListItemProps>(
  ({ title, className, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "hover:bg-accent hover:text-primary focus:bg-accent focus:text-primary block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
              className
            )}
            {...props}
          >
            <div className="text-sm leading-none font-medium">{title}</div>
            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = "ListItem"

export const MainNav = () => {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link
        href="/"
        className="mr-4 flex items-center justify-center gap-1 lg:mr-6"
      >
        <Icons.logo className="size-6 lg:size-10" />
        <div className="hidden flex-col font-bold text-[#DC2626] uppercase lg:inline-flex">
          <span className="text-2xl leading-none">Adventex</span>
          <span className="text-[8px] leading-none">
            International Group Co., Ltd.
          </span>
        </div>
      </Link>
      <NavigationMenu>
        <NavigationMenuList className="space-x-4 xl:space-x-6">
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                "hover:text-primary/80 data-[state=open]:text-primary bg-transparent p-0 text-sm font-normal transition-colors hover:bg-transparent data-[state=open]:bg-transparent",
                pathname === "/tours/studies" ? "text-primary" : ""
              )}
            >
              <Link href="/tours/studies">แพ็คเกจเรียน</Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <Link
                    href="/tours/studies"
                    legacyBehavior
                    passHref
                  >
                    <NavigationMenuLink className="from-muted/50 to-muted flex size-full flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none select-none focus:shadow-md">
                      <div className="mt-4 mb-2 text-lg font-medium">
                        แพ็คเกจทั้งหมด
                      </div>
                      <p className="text-muted-foreground text-sm leading-tight">
                        ค้นพบประสบการณ์การเรียนรู้และการท่องเที่ยวในประเทศจีน
                        พร้อมแพ็คเกจที่ครอบคลุมทั้งที่พัก การเดินทาง
                        และกิจกรรมต่างๆ
                      </p>
                    </NavigationMenuLink>
                  </Link>
                </li>
                <ListItem
                  title="แพ็คเกจเรียนระยะสั้น"
                  href="/tours/studies?duration=short"
                >
                  เรียนรู้ภาษาและวัฒนธรรมจีนผ่านหลักสูตรระยะสั้น 1-6 เดือน
                  พร้อมที่พักและกิจกรรมครบครัน
                </ListItem>
                <ListItem
                  title="แพ็คเกจเรียนระยะยาว"
                  href="/tours/studies?duration=long"
                >
                  หลักสูตรการศึกษาระยะยาว 1-4 ปี
                  พร้อมโอกาสฝึกงานและเรียนรู้วิถีชีวิตในประเทศจีน
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="/about"
              legacyBehavior
              passHref
            >
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "hover:text-primary/80 bg-transparent p-0 text-sm font-normal transition-colors hover:bg-transparent",
                  pathname?.startsWith("/about") ? "text-primary" : ""
                )}
              >
                เกี่ยวกับเรา
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="/contact"
              legacyBehavior
              passHref
            >
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "hover:text-primary/80 bg-transparent p-0 text-sm font-normal transition-colors hover:bg-transparent",
                  pathname?.startsWith("/contact") ? "text-primary" : ""
                )}
              >
                ติดต่อเรา
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
