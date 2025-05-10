import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

import { siteConfig } from "@/config/site"
import { ContactForm } from "@/modules/contact/components/contact-form"
import { Icons } from "@/modules/web/components/ui/icons"

const contactInfo = [
  {
    details: ["support@adventex.co.th"],
    icon: Mail,
    title: "อีเมล",
  },
  {
    details: ["+66 64 213 0656", "+66 84 105 7598"],
    icon: Phone,
    title: "โทรศัพท์",
  },
  {
    details: ["121/2 เลขที่ 3 ต.เวียง", "อ.เชียงแสน จ.เชียงราย 57120"],
    icon: MapPin,
    title: "ที่อยู่",
  },
]

const socialLinks = [
  {
    color: "#1877F2",
    icon: Icons.facebook,
    title: "Adventexeducation",
    url: siteConfig.links.facebook,
  },
  {
    color: "#E4405F",
    icon: Icons.instagram,
    title: "Adventexeducation",
    url: siteConfig.links.instagram,
  },
  {
    color: "#00C300",
    icon: Icons.line,
    title: "Adventexeducation",
    url: siteConfig.links.line,
  },
  {
    color: "#000000",
    icon: Icons.tiktok,
    title: "Adventexeducation",
    url: siteConfig.links.tiktok,
  },
]

export const metadata: Metadata = {
  title: "ติดต่อเรา",
}

export default function ContactPage() {
  return (
    <div className="border-grid border-b">
      <div className="container-wrapper">
        <div className="container py-8">
          <div className="grid gap-16 lg:grid-cols-3">
            <div className="space-y-8">
              {contactInfo.map((item) => {
                return (
                  <div
                    key={item.title}
                    className="flex gap-4"
                  >
                    <div className="shrink-0">
                      <div className="bg-primary/10 flex size-12 items-center justify-center rounded-full">
                        <item.icon className="text-primary size-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">{item.title}</h3>
                      {item.details.map((detail, i) => {
                        return (
                          <p
                            key={i}
                            className="text-muted-foreground"
                          >
                            {detail}
                          </p>
                        )
                      })}
                    </div>
                  </div>
                )
              })}

              <div>
                <h3 className="mb-4 font-semibold">ติดต่อเราผ่านโซเชียล</h3>
                <div className="flex flex-col gap-4">
                  {socialLinks.map((social, idx) => {
                    return (
                      <Link
                        key={idx}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-lg px-4 py-2 transition-colors hover:opacity-80"
                        style={{
                          backgroundColor: `${social.color}15`,
                          color: social.color,
                        }}
                      >
                        <social.icon className="size-4" />
                        <span>{social.title}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>

              <div>
                <h3 className="mb-4 font-semibold">สแกนเพื่อติดต่อ</h3>
                <div className="rounded-xl p-4">
                  <Image
                    src="/images/shared/qrcode.png"
                    alt="QR Code"
                    width={100}
                    height={100}
                    className="size-full rounded-xl"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <ContactForm className="rounded border shadow-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
