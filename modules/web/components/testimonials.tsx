import * as React from "react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Marquee } from "@/components/magicui/marquee"

const testimonials = [
  {
    author: {
      avatar: "https://avatar.vercel.sh/sarahc",
      handle: "@kanpichinese",
      name: "กิตติพงศ์ วัฒนากุล",
    },
    text: "เรียนภาษาจีนพร้อมทั้งเที่ยวอีก ไม่มีพื้นฐานสามารถไปได้ คือดีมากกก!! ใครที่ยังไม่มีพื้นฐานอยากให้มาลองสักครั้ง มีทั้งกิจกรรม ได้เเข้าเทศกาลฟิมะฟรี บอกเลยว่าห้ามพลาด",
  },
  {
    author: {
      avatar: "https://avatar.vercel.sh/davidw",
      handle: "@parin.mandarin",
      name: "ชญานิษฐ์ โสภณศิริ",
    },
    text: "ที่หนูเรียนจะเป็นคลาส B ค่ะตอนเรียนจะมีพินอินนิดๆหน่อยๆอาจารย์ในคลาสใจดีมากกกกกเรียนสนุกสุดๆ การเรียนจีนที่นี่คือดีเลยค่ะ สำเนียงคนฮาร์บินฟังง่าย เข้าใจง่าย ที่นี้เริ่มเรียน 08:00-12:20 น. บางวันหนูก็จะมีเรียนบ่ายด้วยถึง 17:00 น. เเต่ส่วนมากเรียนสนุกไม่เครียดค่ะ อยู่จีนไม่ต้องกังวลเลยพวกพี่ๆพร้อมให้คำปรึกษา เเบบ 24 ชม. ที่เป็น 24 ชม. จริงๆ ค้าบ",
  },
  {
    author: {
      avatar: "https://avatar.vercel.sh/emmat",
      handle: "@chonnichinese",
      name: "Suphakan Wongchai",
    },
    text: "หนูไปเป็นเด็กคอร์ส 1 เดือนค่ะ เป็นการเรียนแบบพื้นฐาน แต่พวกหนูมีพื้นฐานอยู่แล้ว ก็สามารถบอกเหล่าชือได้ เหล่าชือจะปรับการสอนให้เข้ากับพื้นฐานของเรา พี่ๆทางโครงการให้คำปรึกษาตลอดค่ะ ไม่ว่าจะเป็นเรื่องเรียน เรื่องการท่องเที่ยว เรื่องที่พัก สภาพแวดล้อมที่ฮาร์บินไม่ค่อยวุ่นวายค่ะ ไม่อันตราย รถสาธารณะราคาไม่แพง เป็นเมืองที่ใช้ชีวิตง่าย",
  },
  {
    author: {
      avatar: "https://avatar.vercel.sh/michaell",
      handle: "@nat.mandarinstory",
      name: "สุรเดช แสงสุวรรณ",
    },
    text: "ไปจีนครั้งนี้สนุกมากกก เพื่อนทุกคนช่วยกันเรียน เหล่าซือน่ารักทุกคนเลย ใจดีมาก ๆ เหล่าซือสอนแล้วอธิบายและแตกคำศัพท์เยอะมาก ๆ ได้ความรู้เต็ม ๆ วิชาวัฒนธรรมจีนก็สนุกมากครับ กินอาหารท้องถิ่นและเรียนดนตรีจีน ได้เพื่อนเพิ่มเยอะเลย คนจีนใจดีกับเรามาก และพี่ ๆ ในโครงการคอยช่วยเหลือและดูแลตลอดเลยครับ เป็นโครงการที่อบอุ่นมากๆ",
  },
  {
    author: {
      avatar: "https://avatar.vercel.sh/lisaw",
      handle: "@pach.chinesecorner",
      name: "Piyaporn Thavornkul",
    },
    text: "หนูไปเรียน 3 เดือนค่ะ เรื่องการเรียนรู้สึกว่าการเรียนการสอนโอเคดี เหล่าซือแต่ละคนที่สอนใจดีมากๆค่ะ ใจดีแบบใจดีจริงๆ มีเรียนทั้งภาคเช้าและบ่ายและได้เรียนวัฒนธรรมด้วยค่ะ เหล่าซือดูแลเอาใจใส่ดีมากๆค่ะ ส่วนเรื่องโครงการ โครงการดูแลดีค่ะ พร้อมช่วยเหลือตลอด ปรึกษาได้ตลอดเวลา",
  },
  {
    author: {
      avatar: "https://avatar.vercel.sh/toma",
      handle: "@tanya.chinesejourney",
      name: "Pornprapa Srisuk",
    },
    text: "รู้สึกว่าค่อนข้างสะดวกในระดับนึงเลยค่ะ อาบน้ำอุ่นสบายมากพี่ในโครงการคุยง่าย เฟรนด์ลี่มากเลยค่ะ คุยด้วยแล้วสบายใจ เรียนไม่ได้หนัก เหล่าซือใจดีค่ะ!",
  },
  {
    author: {
      avatar: "https://avatar.vercel.sh/jessicak",
      handle: "@pitch.learnchinese",
      name: "ธนพล จันทร์โอชา",
    },
    text: "ไปเรียนภาษาจีนครั้งนี้ รู้สึกว่าได้ศัพท์ที่ใช้ในชีวิตประจำวันเยอะมากๆ ที่นี่จะสอนแบบบรรยายจีนล้วน ควรมีพื้นฐานภาษาไปนิดนึงก็ดี ถ้าไปแบบกลางเทอมนะ แต่เหล่าซือที่นี่ก็น่ารักสุดๆ สอนแบบค่อยๆไป เพราะเราอยู่คลาสA มีเรียกให้อ่านบ้างนิดหน่อย คำไหนอ่านไม่ออกเหล่าซือก็คอยบอกตลอด ไม่ต้องกลัวจะอ่านผิดเลย สุดท้ายนี้ขอบคุณต๋ง สตาฟที่ดูแลที่จีน ดูแลเราดีมากๆ แบบเราขอความช่วยเหลือไปกี่ครั้งก็ช่วยเหลือตลอด ขอบคุณมากๆเลย",
  },
  {
    author: {
      avatar: "https://avatar.vercel.sh/ryanz",
      handle: "@anawin.mandarinpath",
      name: "Natchaya Boonyarat",
    },
    text: "พี่ๆในโครงการเป็นกันเองและเฟรนลี่มากๆค่ะ พี่ๆดูแลดีมากๆ ดูแลแบบดีสุดๆเลยค่ะ ดูแลทุกอย่างช่วยทุกอย่างเลยค่ะ มีปัญหาอะไรทักหาให้พี่ๆช่วยพี่ๆก็พร้อมช่วยเสมอเลยค่ะ และรู้สึกปลอดภัยมากๆ ค่ะไม่รู้สึกกลัวอะไรเลย เป็นโครงการที่รู้สึกว่าถ้ามีโอกาสจะไปกับโครงการนี้อีกครั้งแน่นอนค่ะ",
  },
  {
    author: {
      avatar: "https://avatar.vercel.sh/sophiem",
      handle: "@sirinna.chineseworld",
      name: "Sirinnapa Nuanchan",
    },
    text: "ไปเรียนที่จีนรู้สึกว่าเปิดประสบการณ์หลายอย่างมาก การได้คุยกับคนจีนฝึกภาษากับคนจีนตรงๆเรียนรู้และเข้าใจมากขึ้นเหล่าซือใจดีมากตรงไหนไม่เข้าใจก็อธิบายให้ฟัง ส่วนหอพักในห้องมี อุปกรณ์ให้ใช้สะดวกมาก ถ้าอยากทํากับข้าวในหอพักก็มีครัวกลางให้ บรรยากาศในมหาลัยดีมากตอนช่วงที่ไปอากาศกําลังสบายอยากไปไหนหน้ามหาลัยก็มีรถไฟฟ้าใต้ดินสะดวกต่อการเดินทาง มีพี่ๆพาไปชมสถานที่ท่องเที่ยวแนะนําสถานที่เที่ยวสวยๆ ให้คําปรึกษาตลอด",
  },
  {
    author: {
      avatar: "https://avatar.vercel.sh/jamesp",
      handle: "@krittin.chinesevibes",
      name: "Thanchanok Rattanapong",
    },
    text: "พี่ๆในโครงการดูแลดีมากๆค่อนข้างเป็นกันเองเวลามีปัญหาอะไรพี่ๆทีมงานก็จะหาวิธีแก้ปัญหาให้เร็วมากๆ และเวลาเรียนก้ไม่เครียดเพราะว่าตารางสอนค่อนข้างจัดเวลาต่างๆได้ดี เป็นฟิลแบบไปเรียนแล้วก็ไปเที่ยวในตัวทำให้รู้สึกผ่อนคลายไม่เครียด คนที่ฮาร์บินก็น่ารักมาก เหล่าซือสอนสนุกเป็นกันเองมากๆ น่ารักมากคับ",
  },
  {
    author: {
      avatar: "https://avatar.vercel.sh/annag",
      handle: "@wara.mandarinstyle",
      name: "Nattapon Charoensuk",
    },
    text: "ได้ลองไปใช้ชีวิตที่ต่างประเทศครั้งแรกเปิดโลกมากเลยค่ะที่นู่นต่างจากที่ไทยมากอากาศดีสุดๆ เรื่องเรียนเรียนไม่ค่อยหนักเลยครับเรียนกับครูเจ้าของภาษาเลย ครูแต่ละคนใจดีมากๆ ถ้ามีโอกาสก็จะไปอีกแน่นอนครับ",
  },
]

const firstRow = testimonials.slice(0, 5)
const secondRow = testimonials.slice(5)

interface TestimonialCardProps {
  author: {
    name: string
    handle: string
    avatar: string
  }
  text: string
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ author, text }) => {
  return (
    <Card
      className={cn(
        "flex flex-col rounded-lg border-t",
        "from-muted/50 to-muted/10 bg-gradient-to-b",
        "p-4 text-start sm:p-6",
        "hover:from-muted/60 hover:to-muted/20",
        "h-full max-h-full max-w-[320px] sm:max-w-[320px]",
        "transition-colors duration-300"
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar className="size-12">
          <AvatarImage
            src={author.avatar}
            alt={author.name}
          />
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-base leading-none font-semibold">
            {author.name}
          </h3>
        </div>
      </div>
      <p className="text-muted-foreground mt-4 text-sm">{text}</p>
    </Card>
  )
}

export const Testimonials = () => {
  return (
    <section className="container-wrapper">
      <div className="container py-4 xl:py-6 2xl:py-4">
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="text-primary text-xl font-semibold xl:text-4xl">
              ทำไมต้อง <span className="text-[#DC2626]">Adventex Education?</span>
            </span>
            <div className="flex flex-row items-center justify-center max-sm:flex-col">
              <h2 className="text-4xl font-bold xl:text-6xl">ลูกค้าของเรา</h2>
              <span className="text-4xl font-bold xl:text-6xl">
                พูดถึงเรายังไงบ้าง
              </span>
            </div>
            <p className="text-muted-foreground max-w-prose text-lg xl:text-xl">
              {`Adventex Education เกิดจากความมุ่งมั่นและแรงบันดาลใจของนักศึกษาที่เคยศึกษาในมหาวิทยาลัยชั้นนำของประเทศจีนเราตระหนักถึงความสำคัญของ "ภาษาที่สาม" ในโลกอนาคต ซึ่งไม่ได้เป็นเพียงเครื่องมือในการสื่อสารแต่ยังเป็นสะพานที่เชื่อมโยงวัฒนธรรม ความรู้ และโอกาสระดับโลก`}
            </p>
          </div>
          <div className="relative flex size-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover>
              {firstRow.map((testimonial) => {
                return (
                  <TestimonialCard
                    key={testimonial.author.name}
                    author={testimonial.author}
                    text={testimonial.text}
                  />
                )
              })}
            </Marquee>
            <Marquee
              reverse
              pauseOnHover
            >
              {secondRow.map((testimonial) => {
                return (
                  <TestimonialCard
                    key={testimonial.author.name}
                    author={testimonial.author}
                    text={testimonial.text}
                  />
                )
              })}
            </Marquee>
            <div className="dark:from-background pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white" />
            <div className="dark:from-background pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white" />
          </div>
        </div>
      </div>
    </section>
  )
}
