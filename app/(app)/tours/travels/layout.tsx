import * as React from "react"

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="container space-y-4 py-4">{children}</div>
}
