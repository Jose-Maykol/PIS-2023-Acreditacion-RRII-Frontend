/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@nextui-org/react'
import { ReactNode } from 'react'
import CustomModal from '../CustomModal'
import { NarrativeService } from '@/api/Narrative/narrativeService'
import WarningIcon from '@/components/Icons/WarningIcon'
import { useToast } from '@/hooks/toastProvider'
import { useRouter } from 'next/navigation'

interface EnableNarrativeModalProps {
	id: string
	isOpen: boolean
	onConfirmation: () => void
	onCancel: () => void
}

export default function EnableNarrativeModal({ id, isOpen, onConfirmation, onCancel }: EnableNarrativeModalProps) {
	const { showToast, updateToast } = useToast()
	const router = useRouter()

	const header: ReactNode = (
		<h2 className='flex flex-col gap-1 text-lightBlue-600 uppercase'>
			Confirmacion
		</h2>
	)

	const body: ReactNode = (
		<div className='h-full max-h-[96%]'>
			<div className='flex items-center gap-2'>
				<WarningIcon width={60} height={60} fill='fill-red-500' />
				<div className='flex flex-col gap-1'>
					<p className='text-md font-semibold'>¿Está seguro de Habilitar Narrativa?</p>
					<p className='text-xs font-normal'>Esta acción es <span className='font-bold uppercase'>irreversible</span>. La opción <span className='font-bold uppercase'>eliminar evidencias</span> será <span className='font-bold uppercase'>deshabilitada</span></p>
				</div>
			</div>
		</div>
	)

	const handleSaveNarrative = async () => {
		const notification = showToast('Procesando...')
		await NarrativeService.enableNarrative(id).then(() => {
			updateToast(notification, 'Se ha habilitado la Narrativa', 'success')
		}).catch(() => {
			updateToast(notification, 'Ocurrio un error al habilitar la Narrativa', 'error')
		})
		onConfirmation()
		router.refresh()
	}

	return (
		<>
			<CustomModal
				isOpen={isOpen}
				size='xl'
				onClose={onCancel}
				header={header}
				body={body}
				footer={
					<>
						<Button className='bg-lightBlue-600 text-white' variant='flat' onPress={onCancel}>
							Cancelar
						</Button>
						<Button color='danger' variant='solid' onPress={handleSaveNarrative}>
							Habilitar
						</Button>
					</>
				}
			/>
		</>
	)
}
