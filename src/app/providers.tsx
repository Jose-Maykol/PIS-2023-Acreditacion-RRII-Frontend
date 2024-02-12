'use client'

import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import ToastProvider from '@/hooks/toastProvider'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<ToastProvider>
				<NextUIProvider>{children}</NextUIProvider>
			</ToastProvider>
		</QueryClientProvider>
	)
}
