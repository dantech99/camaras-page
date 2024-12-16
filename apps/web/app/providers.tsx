'use client'

import { NextUIProvider } from '@nextui-org/react'
import type React from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>{children}</NextUIProvider>
  )
}
