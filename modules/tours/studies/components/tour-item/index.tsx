import { FavoriteButton } from "@/modules/favorites/components/favorite-button"

import { TourStudies } from "../../types"
import { TourItemFooter } from "./tour-item-footer"
import { TourItemHighlights } from "./tour-item-highlights"
import { TourItemImage } from "./tour-item-image"
import { TourItemInfo } from "./tour-item-info"
import { TourItemTableDates } from "./tour-item-table-dates"

function TourItem({ tour }: { tour: TourStudies }) {
  const content =
    tour.highlights?.reduce((acc, prev) => acc + "-" + prev.highlight, "") ||
    "N/A"

  return (
    <div className="bg-background overflow-hidden rounded-md max-sm:border">
      <div className="p-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative w-full md:w-1/3">
            <FavoriteButton
              id={tour.id}
              type="study"
              name={tour.name}
              image={tour.image?.url || "/placeholder.svg"}
            />
            <TourItemImage
              name={tour.name}
              code={tour.code}
              url={tour.image?.url || "/placeholder.svg"}
              alt={tour.image?.alt || "Tour Image"}
            />
          </div>

          <div className="w-full md:w-2/3">
            <TourItemInfo
              name={tour.name}
              code={tour.code}
              duration={tour.duration || "N/A"}
              university={tour.university}
            />

            <TourItemHighlights content={content} />
          </div>
        </div>

        <TourItemTableDates departureDates={tour.departureDates} />
      </div>

      <TourItemFooter
        price={tour.basePrice || 0}
        code={tour.code}
        name={tour.name}
      />
    </div>
  )
}

export { TourItem }
