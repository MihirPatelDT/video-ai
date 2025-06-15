"use client"

import { ImageKitProvider } from "@imagekit/next"
import { SessionProvider } from "next-auth/react"

const urlEndPoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!

// Below is just a wrapper and it will return its children and wrap children with sessionprovider
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchInterval={5 * 60}>
      <ImageKitProvider urlEndpoint={urlEndPoint}>{children}</ImageKitProvider>
    </SessionProvider>
  )
}
