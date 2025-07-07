import Image from "next/image"
import Link from "next/link"

function TourItemImage({
  name,
  code,
  url,
  alt,
}: {
  name: string
  code: string
  url: string
  alt: string
}) {
  return (
    <Link
      title={name}
      href={`/tours/studies/${code}`}
    >
      <Image
        src={url}
        alt={alt}
        width={266}
        height={266}
        className="h-auto w-full rounded-md object-contain"
      />
    </Link>
  )
}

export { TourItemImage }
