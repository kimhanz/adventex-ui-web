import { CheckIcon, XIcon } from "lucide-react"

const includedServices = [
  "ค่าตั๋วเครื่องบินไป-กลับแบบหมู่คณะ ชั้นประหยัด",
  "ค่ารถที่บริษัทจัดเตรียม",
  "ค่าเข้าชมสถานที่ต่างๆ ตามที่ระบุในรายการ",
  "ค่าน้ำหนักกระเป๋าโหลดได้ท่านละครอง 20 กิโลกรัม",
  "น้ำดื่มวันละ 1 ขวดต่อท่าน",
  "ค่าอาหารตามที่ระบุในรายการ",
  "ค่ามัคคุเทศก์ท้องถิ่นทำหน้าที่ทัวร์ ตลอดการเดินทาง",
  "ค่าห้องพักในโรงแรมที่ระบุหรือเทียบเท่า(2-3ท่าน/ห้อง)",
  "ค่าประกันอุบัติเหตุวงเงิน1,000,000 บาท(เงื่อนไขตามกรมธรรม์)",
]

const excludedServices = [
  "ค่าใช้จ่ายในการทำพาสปอร์ต",
  "ค่าธรรมเนียมกรณีกระเป๋าน้ำหนักเกินกว่ากำหนด",
  "ค่าใช้จ่ายส่วนตัวของผู้เดินทาง",
  "ค่าภาษีมูลค่าเพิ่ม VAT 7%และหักภาษี ณ ที่จ่าย 3%",
  "ค่าธรรมเนียมเอกสารเดินทางเข้าประเทศจีนสำหรับผู้ถือพาสปอร์ตต่างประเทศที่ต้องขอวีซ่า",
  "ค่าอาหารนอกเหนือจากที่ระบุในรายการ",
]

function TourTerms() {
  return (
    <div className="space-y-8 py-4">
      <h2 className="border-b pb-4 text-3xl font-bold">
        ข้อตกลง & เงื่อนไข ของโปรแกรมทัวร์
      </h2>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold">อัตราค่าบริการนี้รวม:</h3>
        <ul className="space-y-4">
          {includedServices.map((service, index) => (
            <li
              key={index}
              className="flex items-start gap-3"
            >
              <div className="flex-shrink-0 rounded-full bg-[#1877f2] p-1">
                <CheckIcon className="text-background h-5 w-5" />
              </div>
              <span>{service}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold">อัตราค่าบริการนี้ไม่รวม:</h3>
        <ul className="space-y-4">
          {excludedServices.map((service, index) => (
            <li
              key={index}
              className="flex items-start gap-3"
            >
              <div className="flex-shrink-0 rounded-full bg-red-500 p-1">
                <XIcon className="text-background h-5 w-5" />
              </div>
              <span>{service}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export { TourTerms }
