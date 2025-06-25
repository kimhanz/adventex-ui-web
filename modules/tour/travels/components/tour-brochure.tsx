import { Media } from "@/payload-types"

export function TourBrochure({ brochure }: { brochure: Media }) {
  if (!brochure || !brochure.url) {
    return (
      <div className="flex h-[200px] items-center justify-center rounded border border-dashed border-neutral-300 bg-neutral-50 text-neutral-500">
        ขณะนี้ยังไม่มีตารางกิจกรรมโปรแกรมทัวร์
      </div>
    )
  }

  return (
    <div className="overflow-hidden">
      {brochure.mimeType === "application/pdf" ? (
        <iframe
          src={brochure.url}
          className="h-[700px] w-full"
          title={brochure.alt || "PDF Viewer"}
        ></iframe>
      ) : brochure.mimeType === "image/png" ? (
        <img
          src={brochure.url}
          alt={brochure.alt || "Tour Brochure Image"}
          className="h-auto w-full object-contain"
        />
      ) : (
        <p>Unsupported brochure format: {brochure.mimeType}</p>
      )}
    </div>
  )
}
