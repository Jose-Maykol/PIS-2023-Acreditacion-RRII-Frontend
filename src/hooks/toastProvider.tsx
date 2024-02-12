'use client'

import React, { ReactNode, createContext, useContext } from 'react'
import { Id, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface ToastProviderProps {
	children: ReactNode
}

type ToastContextType = {
	showToast: (message: string) => Id,
	updateToast: (
		id: Id,
		message: string,
		type: 'success' | 'error' | 'info' | 'warning'
	) => void
	newToast: (
		message: string,
		type: 'success' | 'error' | 'info' | 'warning'
	) => void
};

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export default function ToastProvider({ children }: ToastProviderProps) {
	const showToast = (message: string): Id => {
		const notification = toast.loading(message, {
			position: toast.POSITION.TOP_RIGHT,
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined
		})
		return notification
	}

	const newToast = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
		toast(message, {
			type,
			position: toast.POSITION.TOP_RIGHT,
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			isLoading: false,
			theme: 'light'
		})
	}

	const updateToast = (
		id: Id,
		message: string,
		type: 'success' | 'error' | 'info' | 'warning'
	) => {
		toast.update(id, {
			render: message,
			type,
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			isLoading: false,
			theme: 'light'
		})
	}

	const contextValue = {
		showToast,
		updateToast,
		newToast
	}

	return (
		<ToastContext.Provider value={contextValue}>
			{children}
			<ToastContainer
				theme='light'
			/>
		</ToastContext.Provider>
	)
}

export const useToast = (): ToastContextType => {
	const context = useContext(ToastContext)
	if (!context) {
		throw new Error('useToast debe ser utilizado dentro de un ToastProvider')
	}
	return context
}
