import * as React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function FilterSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Card className="bg-muted border-none shadow-none">
      <CardHeader className="px-4 py-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 px-4">{children}</CardContent>
    </Card>
  )
}

export { FilterSection }
