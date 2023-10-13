'use client'

import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import ToastProvider from '@/hooks/toastProvider'

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ToastProvider>
			<NextUIProvider>
				{children}
			</NextUIProvider>
		</ToastProvider>
	)
}