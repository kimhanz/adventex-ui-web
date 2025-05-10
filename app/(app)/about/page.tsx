import type { Metadata } from "next"

import { BlurFade } from "@/components/magicui/blur-fade"

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา",
}

export default function AboutPage() {
  return (
    <div className="space-y-4 xl:space-y-6 2xl:space-y-8">
      <section className="border-grid border-b">
        <div className="container-wrapper">
          <div className="container py-4">
            <div className="relative">
              <div className="flex flex-col overflow-hidden">
                <BlurFade>
                  <div className="flex flex-col gap-4 p-8">
                    <h1 className="text-4xl font-bold">เกี่ยวกับเรา</h1>
                    <div className="text-muted-foreground w-full pb-4 text-lg">
                      <p className="indent-8">
                        Adventex Education
                        เกิดจากความมุ่งมั่นและแรงบันดาลใจของนักศึกษาที่เคยศึกษาในมหาวิทยาลัยชั้นนำของประเทศจีน
                        เราตระหนักถึงความสำคัญของ &ldquo;ภาษาที่สาม&ldquo;
                        ในโลกอนาคต ซึ่งไม่ได้เป็นเพียงเครื่องมือในการสื่อสาร
                        แต่ยังเป็นสะพานที่เชื่อมโยงวัฒนธรรม ความรู้
                        และโอกาสระดับโลก
                      </p>
                      <p className="indent-8">
                        ในระหว่างที่เราศึกษาในต่างประเทศนั้น เราพบว่า
                        &ldquo;การไปเรียนต่างประเทศ&ldquo;
                        ยังเป็นความฝันที่ดูไกลเกินเอื้อมสำหรับหลายคน
                        ด้วยข้อจำกัดทางภาษา กระบวนการที่ซับซ้อน
                        และความไม่มั่นใจของผู้เรียน
                        เราจึงมีเป้าหมายสำคัญที่จะเปลี่ยนมุมมองนี้
                        และทำให้การศึกษาในต่างประเทศกลายเป็นเรื่องที่เข้าถึงง่ายและเป็นไปได้สำหรับทุกคน
                      </p>
                    </div>
                  </div>
                </BlurFade>
              </div>
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,87,34,0.1),transparent_50%)]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,87,34,0.05),transparent_50%)]" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-wrapper">
        <div className="container py-4 xl:py-6 2xl:py-4">
          <BlurFade className="mx-auto grid max-w-prose gap-4 text-center">
            <h2 className="text-3xl font-bold">พันธกิจของเรา</h2>
            <p className="text-muted-foreground indent-8 text-lg">
              Adventex
              มุ่งมั่นที่จะพัฒนาบริการที่ช่วยสนับสนุนการเรียนรู้และการเตรียมตัวสำหรับการศึกษาต่อในต่างประเทศ
              ไม่ว่าจะเป็น การพัฒนาทักษะภาษาที่สาม
              การให้คำปรึกษาด้านการศึกษาและรวมถึงผู้ดูแลที่ช่วยเหลือในขณะเราอยู่ต่างประเทศ
              ทำให้ผู้เดินทางเกิดความสบายใจ
              และการสร้างโอกาสให้ผู้เรียนได้เข้าถึงประสบการณ์ใหม่ๆ
            </p>
          </BlurFade>
        </div>
      </section>
    </div>
  )
}
