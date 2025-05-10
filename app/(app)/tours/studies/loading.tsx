import { FilterPanelSkeleton } from "@/modules/tours/studies/components/skeletons/FilterPanelSkeleton"
import { TourSectionSkeleton } from "@/modules/tours/studies/components/skeletons/TourSectionSkeleton"
import { TourBreadcrumbHeader } from "@/modules/tours/studies/components/tour-breadcrumb-header"
import { TourInformationHeader } from "@/modules/tours/studies/components/tour-information-header"

export default function Loading() {
  return (
    <>
      <header className="hidden w-full space-y-4 md:block">
        <TourBreadcrumbHeader />
        <TourInformationHeader />
      </header>

      <div className="relative flex flex-col gap-6 md:flex-row">
        <FilterPanelSkeleton />
        <TourSectionSkeleton />
      </div>
    </>
  )
}
