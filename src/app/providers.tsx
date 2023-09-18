'use client'

import React from 'react'
import { UserProvider } from '@/hooks/UserContext'
import { NextUIProvider } from '@nextui-org/react'

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NextUIProvider>
			<UserProvider>
				{children}
			</UserProvider>
		</NextUIProvider>
	)
}