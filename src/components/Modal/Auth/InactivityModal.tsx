/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'
import { Button } from '@nextui-org/react'
import { useToast } from '@/hooks/toastProvider'
import { AuthService } from '@/api/Auth/authService'
import CustomModal from '../CustomModal'
import { useSessionStore } from '@/store/useSessionStore'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'
import { BaseService } from '@/api/Base/BaseService'

export default function InactivityModal() {
	const { isModalOpen, closeModal, sessionState, setSessionState } = useSessionStore()
	const { showToast, updateToast } = useToast()

	useEffect(() => {
		if (sessionState === 'expired') {
			AuthService.logout()
		}
	}, [sessionState])

	const handleExtendUserSession = async () => {
		// const notification = showToast('Procesando...')
		// await AuthService.refreshSession().then((res) => {
		// 	if (res.status === 1) {
		// 		updateToast(notification, res.message, 'success')
		// 	} else {
		// 		updateToast(notification, res.message, 'error')
		// 	}
		// })
		console.log('click')
		closeModal()
		setSessionState('active')
		console.log(sessionState)
	}

	const handleRevokeUserSession = async () => {
		localStorage.removeItem('auth_user')
		localStorage.removeItem('access_token')
		localStorage.removeItem('year')
		localStorage.removeItem('semester')
		useYearSemesterStore.getState().setYear(null)
		useYearSemesterStore.getState().setSemester(null)
		BaseService.deleteConfig()
		window.location.href = '/'
	}

	const header = sessionState === 'inactive' ? 'No hay actividad reciente' : 'La sesión expiró'

	const body = sessionState === 'inactive'
		? 'Su sesión está a punto de caducar. ¿Quiere extender su sesión actual?'
		: 'Su sesión ha excedido el tiempo límite. Por favor, acceda de nuevo.'

	return (
		<>
			<CustomModal
				isOpen={isModalOpen}
				modalPlacement='top'
				isDismissable
				size='xl'
				onClose={closeModal}
				classNames={{
					closeButton: 'hidden'
				}}
				header={<h2 className='flex flex-col gap-1 uppercase'>{header}</h2>}
				body={<div className='h-full max-h-[96%]'><p>{body}</p></div>}
				footer={
					sessionState === 'inactive'
						? (
							<>
								<Button className='bg-lightBlue-600 text-white' variant='solid' onPress={handleExtendUserSession} >
									Extender Sesión
								</Button>
								<Button color='danger' variant='flat' onPress={closeModal}>
									Cancelar
								</Button>
							</>
						)
						: (
							<>
								<Button className='bg-lightBlue-600 text-white' variant='solid' onPress={handleRevokeUserSession} >
									Ok
								</Button>
							</>
						)
				}
			/>
		</>
	)
}
