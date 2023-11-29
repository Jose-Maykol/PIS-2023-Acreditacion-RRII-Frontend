/* eslint-disable @typescript-eslint/no-explicit-any */
import { EvidenceService } from '@/api/Evidence/EvidenceService'
import { Evidence } from '@/types/Evidences'
import {
	Button,
	Input
} from '@nextui-org/react'
import { useState, ReactNode } from 'react'
import { toast } from 'react-toastify'
import CustomModal from '../CustomModal'

export default function RenameEvidenceModal({ evidence, openModal, onCloseModal, onReload } : {evidence: Evidence, openModal: boolean, onCloseModal: () => void, onReload: () => void}) {
	const [renameValue, setRenameValue] = useState<string>(evidence.name)

	const handleCloseModal = () => {
		onCloseModal()
		onReload()
	}

	const handleSubmitChanges = async () => {
		const notification = toast.loading('Procesando...')
		if (evidence.type === 'evidence') {
			await EvidenceService.renameEvidence(evidence.id.split('-')[1], {
				new_filename: renameValue
			}).then((res) => {
				if (res.status === 1) {
					toast.update(notification, {
						render: res.message,
						type: 'success',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						isLoading: false,
						theme: 'colored'
					})
				} else {
					toast.update(notification, {
						render: res.message,
						type: 'error',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						isLoading: false,
						theme: 'colored'
					})
				}
			})
		} else {
			await EvidenceService.renameFolder(evidence.id.split('-')[1], {
				new_name: renameValue
			}).then((res) => {
				if (res.status === 1) {
					toast.update(notification, {
						render: res.message,
						type: 'success',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						isLoading: false,
						theme: 'colored'
					})
				} else {
					toast.update(notification, {
						render: res.message,
						type: 'error',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						isLoading: false,
						theme: 'colored'
					})
				}
			})
		}
		handleCloseModal()
	}

	const header: ReactNode = (
		<h2 className='flex flex-col gap-1 text-lightBlue-600 uppercase'>
			Renombrar {evidence.type === 'evidence' ? 'Archivo' : 'Carpeta'}
		</h2>
	)

	const body: ReactNode = (
		<div className='h-full max-h-[96%]'>
			<Input
				autoFocus
				placeholder='nuevo nombre'
				variant='bordered'
				onValueChange={setRenameValue}
			/>
		</div>
	)

	return (
		<>
			<CustomModal
				isOpen={openModal}
				classNames={{
					// base: 'h-[60%]',
					// header: 'p-2 border-b-[2px] border-gray-200'
					// body: 'h-[55%] py-2',
					// footer: 'h-[22%]'
				}}
				size='xl'
				onClose={handleCloseModal}
				header={header}
				body={body}
				footer={
					<>
						<Button color='danger' variant='flat' onPress={handleCloseModal}>
							Cancelar
						</Button>
						<Button className='bg-lightBlue-600 text-white' variant='solid' size='lg' onPress={handleSubmitChanges} >
							Guardar
						</Button>
					</>
				}
			/>
		</>
	)
}
