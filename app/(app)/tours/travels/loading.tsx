import { FilterPanelSkeleton } from "@/modules/tours/studies/components/skeletons/filter-panel-skeleton"
import { TourSectionSkeleton } from "@/modules/tours/studies/components/skeletons/tour-section-skeleton"
import { TourBreadcrumbHeader } from "@/modules/tours/studies/components/tour-breadcrumb-header"
import { TourInformationHeader } from "@/modules/tours/studies/components/tour-information-header"

export default function Loading() {
  return (
    <>
      <header className="hidden w-full space-y-4 px-4 py-4 md:block lg:px-6 lg:py-6">
        <TourBreadcrumbHeader />
        <TourInformationHeader />
      </header>

      <div className="relative flex flex-col gap-6 px-4 py-4 md:flex-row lg:px-6 lg:py-6">
        <FilterPanelSkeleton />
        <TourSectionSkeleton />
      </div>
    </>
  )
}
