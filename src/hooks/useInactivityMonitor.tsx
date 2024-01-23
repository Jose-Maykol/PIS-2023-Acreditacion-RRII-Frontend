import { useEffect, useState } from 'react'
import { useSessionStore } from '@/store/useSessionStore'

const useInactivityMonitor = () => {
	let inactivityTimeoutId: any
	const { isModalOpen, openModal, sessionState, setSessionState } = useSessionStore()
	const [inactivityTimeLeft, setInactivityTimeLeft] = useState<number>(15 * 60 * 1000)

	const resetInactivityTimer = () => {
		if (sessionState === 'active' && !isModalOpen) {
			clearTimeout(inactivityTimeoutId)
			setInactivityTimeLeft(15 * 60 * 1000)
		}
	}

	const onInactivityTimeExceeded = () => {
		if (sessionState !== 'expired') {
			openModal()
			setSessionState('expired')
		}
	}

	useEffect(() => {
		const intervalId = setInterval(() => {
			setInactivityTimeLeft((inactivityTimeLeft) => {
				const newTime = inactivityTimeLeft - 1000
				if (newTime <= 2 * 60 * 1000 && newTime > 0 && sessionState === 'active') {
					openModal()
					setSessionState('inactive')
				}

				if (newTime <= 0) {
					onInactivityTimeExceeded()
					clearInterval(intervalId)
				}

				return newTime
			})
		}, 1000)

		return () => clearInterval(intervalId)
	}, [isModalOpen, sessionState])

	useEffect(() => {
		if (sessionState === 'active') {
			document.addEventListener('mousemove', resetInactivityTimer)
			document.addEventListener('keydown', resetInactivityTimer)
			document.addEventListener('visibilitychange', resetInactivityTimer)
		}

		inactivityTimeoutId = setTimeout(onInactivityTimeExceeded, 15 * 60 * 1000)

		return () => {
			clearTimeout(inactivityTimeoutId)
			if (sessionState === 'active') {
				document.removeEventListener('mousemove', resetInactivityTimer)
				document.removeEventListener('keydown', resetInactivityTimer)
				document.removeEventListener('visibilitychange', resetInactivityTimer)
			}
		}
	}, [sessionState])

	return null
}

export default useInactivityMonitor
