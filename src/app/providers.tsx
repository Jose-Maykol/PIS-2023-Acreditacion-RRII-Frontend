'use client'

import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { ToastProvider } from '@/hooks/ToastContext'

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NextUIProvider>
			<ToastProvider>
				{children}
			</ToastProvider>
		</NextUIProvider>
	)
}