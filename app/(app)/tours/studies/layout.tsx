import * as React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl space-y-4">{children}</div>
}
