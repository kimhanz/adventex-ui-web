import { Icons } from "@/modules/web/components/ui/icons"

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
  image?: string
  location?: string
  university?: string
  season?: string
  locationTH?: string
  universityTH?: string
  seasonTH?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export type MainNavItem = NavItem

export type TourNavItem = NavItemWithChildren

export type TourStudyItem = NavItemWithChildren
