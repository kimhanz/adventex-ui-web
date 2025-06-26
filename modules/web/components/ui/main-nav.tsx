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

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Harbin",
    href: "/tours/travels?destination=Harbin",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Beijing",
    href: "/tours/travels?destination=Beijing",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Chengdu",
    href: "/tours/travels?destination=Chengdu",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Shanghai",
    href: "/tours/travels?destination=Shanghai",
    description: "Visually or semantically separates content.",
  },
]

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentProps<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link
        href="/"
        className="mr-4 flex items-center justify-center gap-1 lg:mr-6"
      >
        <Icons.logo className="size-6 lg:size-10" />
        <div className="hidden flex-col font-bold text-[#DC2626] uppercase lg:inline-flex ">
          <span className="text-2xl leading-none">Adventex</span>
          <span className="text-[0.46875rem] leading-none">
            International Group Co., Ltd.
          </span>
        </div>
      </Link>

      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                "bg-transparent hover:bg-transparent hover:text-[#DC2626]/80 data-[state=open]:bg-transparent data-[state=open]:text-[#DC2626]",
                pathname === "/tours/studies" ? "text-[#DC2626]" : ""
              )}
            >
              แพ็คเกจเรียน
            </NavigationMenuTrigger>

            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="from-muted/50 to-muted flex size-full flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none select-none focus:shadow-md"
                      href="/tours/studies"
                    >
                      <div className="mt-4 mb-2 text-lg font-medium">
                        แพ็คเกจทั้งหมด
                      </div>
                      <p className="text-muted-foreground text-sm leading-tight">
                        ค้นพบประสบการณ์การเรียนรู้และการท่องเที่ยวในประเทศจีน
                        พร้อมแพ็คเกจที่ครอบคลุมทั้งที่พัก การเดินทาง
                        และกิจกรรมต่างๆ
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem
                  title="แพ็คเกจเรียนระยะสั้น"
                  href="/tours/studies?type=short"
                >
                  เรียนรู้ภาษาและวัฒนธรรมจีนผ่านหลักสูตรระยะสั้น 1-6 เดือน
                  พร้อมที่พักและกิจกรรมครบครัน
                </ListItem>
                <ListItem
                  title="แพ็คเกจเรียนระยะยาว"
                  href="/tours/studies?type=long"
                >
                  หลักสูตรการศึกษาระยะยาว 1-4 ปี
                  พร้อมโอกาสฝึกงานและเรียนรู้วิถีชีวิตในประเทศจีน
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                "bg-transparent hover:bg-transparent hover:text-[#DC2626]/80 data-[state=open]:bg-transparent data-[state=open]:text-[#DC2626]",
                pathname === "/tours/travels" ? "text-[#DC2626]" : ""
              )}
            >
              แพ็คเกจท่องเที่ยว
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent hover:bg-transparent hover:text-[#DC2626]/80 data-[state=open]:bg-transparent data-[state=open]:text-[#DC2626]",
                pathname === "/blog" ? "text-[#DC2626]" : ""
              )}
            >
              <Link href="/blog">บทความ</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent hover:bg-transparent hover:text-[#DC2626]/80 data-[state=open]:bg-transparent data-[state=open]:text-[#DC2626]",
                pathname === "/about" ? "text-[#DC2626]" : ""
              )}
            >
              <Link href="/about">เกี่ยวกับเรา</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent hover:bg-transparent hover:text-[#DC2626]/80 data-[state=open]:bg-transparent data-[state=open]:text-[#DC2626]",
                pathname === "/contact" ? "text-[#DC2626]" : ""
              )}
            >
              <Link href="/contact">ติดต่อเรา</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

export { MainNav }
