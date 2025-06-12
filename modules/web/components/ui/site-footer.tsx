import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

import { Icons } from "./icons"

const footerLinks = {
  company: [
    { href: "/about", label: "เกี่ยวกับเรา" },
    { href: "/blog", label: "บล็อก" },
    { href: "/contact", label: "ติดต่อเรา" },
  ],
  tours: [
    { href: "/tours/studies", label: "แพ็คเกจทั้งหมด" },
    { href: "/tours/studies", label: "แพ็คเกจเรียน" },
    { href: "/tours/travel", label: "แพ็คเกจท่องเที่ยว" },
  ],
  privacy: [
    {
      href: "/legal/term-conditions",
      label: "นโยบายข้อตกลงและเงื่อนไขการใช้บริการ",
    },
    { href: "/legal/privacy-policy", label: "นโยบายความเป็นส่วนตัว" },
    { href: "/legal/cookies", label: "นโยบายคุกกี้" },
  ],
}

const socialLinks = [
  {
    href: "https://web.facebook.com/profile.php?id=61552757897555",
    icon: Icons.facebook,
  },
  {
    href: "https://www.instagram.com/adventexeducation/?hl=en",
    icon: Icons.instagram,
  },
  { href: "https://www.tiktok.com/@harbin.pp", icon: Icons.tiktok },
]

const contactInfo = [
  { icon: Phone, text: "+66 841057598" },
  { icon: Mail, text: "support@advantex.com" },
  { icon: MapPin, text: "121/2 เลขที่ 3 ต.เวียง อ.เชียงแสน จ.เชียงราย 57120" },
]

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-grid border-t">
      <div className="container-wrapper">
        <div className="container py-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
            <aside className="lg:col-span-2">
              <Link
                href="/"
                className="mb-4 block text-xl font-bold text-[#DC2626] uppercase"
              >
                adventex international group co., ltd.
              </Link>
              <p className="text-muted-foreground mb-6 max-w-[30ch]">
                ทะเบียนพานิชย์เลขที่ 0575567001679
              </p>
              <div className="space-y-3">
                {contactInfo.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="text-muted-foreground flex items-center gap-2"
                    >
                      <item.icon className="size-4" />
                      <span>{item.text}</span>
                    </div>
                  )
                })}
              </div>
            </aside>

            <div>
              <h3 className="mb-4 font-semibold">บริษัท</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => {
                  return (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">แพ็คเกจ</h3>
              <ul className="space-y-3">
                {footerLinks.tours.map((link, index) => {
                  return (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">นโยบาย</h3>
              <ul className="space-y-3">
                {footerLinks.privacy.map((link, index) => {
                  return (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-grid border-t">
        <div className="container-wrapper">
          <div className="container py-4">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-muted-foreground text-center text-sm sm:text-left">
                © {currentYear} Adventex. All rights reserved.
              </p>

              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => {
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <social.icon className="size-5" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
