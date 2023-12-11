/* eslint-disable @typescript-eslint/no-explicit-any */
import { EvidenceService } from '@/api/Evidence/EvidenceService'
import {
	Button
} from '@nextui-org/react'
import { useState, ReactNode, useEffect, useMemo, useCallback, Key } from 'react'
import { toast } from 'react-toastify'
import CustomModal from '../CustomModal'
import { Evidence } from '@/types/Evidences'
import CustomTable from '@/components/Table/CustomTable'
import { getFileIcon } from '@/utils/utils'


export default function MoveEvidenceModal(
	{ evidence, openModal, onCloseModal, onReload } : {evidence: Evidence, openModal: boolean, onCloseModal: () => void, onReload: () => void}) {
	const [folderValue, setFolderValue] = useState<string>('')
	const [folders, setFolders] = useState<Evidence[]>([])
	const columns = [
		{ name: 'CARPETA', uid: 'name', sortable: true },
		{ name: 'ACCIONES', uid: 'actions' }
	]

	useEffect(() => {
		EvidenceService.folderList(
			{
				folder_id: evidence.folder_id ?? null,
				standard_id: evidence.standard_id,
				evidence_type_id: evidence.evidence_type_id
			}
		).then((res) => {
			console.log('lista carpetas', res)
			if (res.status === 1) {
				setFolders(res.data)
			}
		})
	}, [])

	const handleCloseModal = () => {
		onCloseModal()
		onReload()
	}

	const handleSubmitChanges = async () => {
		const notification = toast.loading('Procesando...')
		// await EvidenceService.createFolder({
		// 	name: renameValue,
		// 	standard_id: id,
		// 	evidence_type_id: typeEvidence,
		// 	path
		// }).then((res) => {
		// 	if (res.status === 1) {
		// 		toast.update(notification, {
		// 			render: res.message,
		// 			type: 'success',
		// 			autoClose: 5000,
		// 			hideProgressBar: false,
		// 			closeOnClick: true,
		// 			pauseOnHover: true,
		// 			draggable: true,
		// 			isLoading: false,
		// 			theme: 'colored'
		// 		})
		// 	} else {
		// 		toast.update(notification, {
		// 			render: res.message,
		// 			type: 'error',
		// 			autoClose: 5000,
		// 			hideProgressBar: false,
		// 			closeOnClick: true,
		// 			pauseOnHover: true,
		// 			draggable: true,
		// 			isLoading: false,
		// 			theme: 'colored'
		// 		})
		// 	}
		// })
		handleCloseModal()
	}

	const header: ReactNode = (
		<h2 className='flex flex-col gap-1 text-lightBlue-600 justify-center items-start'>
			Mover "{evidence.name}"
		</h2>
	)

	const renderCell = useCallback((folder: Evidence, columnKey: Key) => {
		switch (columnKey) {
		case 'name':
			return (
				<div className='flex gap-1'>
					{getFileIcon('', 'folder', 20)}
					<h2 className='text-bold text-md capitalize'>{folder.name}</h2>
				</div>
			)
		case 'actions':
			return (
				<div className='invisible flex relative items-center gap-2 justify-end group-hover/item:visible'>
					<Button color='primary' size='sm' variant='ghost'>Mover</Button>
					<p>ir</p>
				</div>
			)
		}
	}, [])

	const classNames = useMemo(
		() => ({
			wrapper: ['h-[200px]'],
			th: ['bg-default-200', 'text-default-600', 'border-b', 'border-divider', 'px-2', 'py-1', 'text-sm'],
			td: [
				// changing the rows border radius
				// first
				'group-data-[first=true]:first:before:rounded-none',
				'group-data-[first=true]:last:before:rounded-none',
				// middle
				'group-data-[middle=true]:before:rounded-none',
				// last
				'group-data-[last=true]:first:before:rounded-none',
				'group-data-[last=true]:last:before:rounded-none',
				'group-data-[last=true]:last:hover::rounded-none'
			],
			tr: ['hover:bg-default-300 group/item']
		}),
		[]
	)

	const body: ReactNode = (
		<div className='h-full flex flex-col gap-2 items-center justify-center max-h-[96%]'>
			<div className='flex gap-1'>
				<p className='text-gray-500'>Carpeta actual:</p>
				<Button variant='bordered' color='primary' size='sm'>{evidence.path.split('/').pop()}</Button>
			</div>
			<CustomTable
				items={folders}
				columns={columns}
				renderCell={renderCell}
				topContent={<>
					<div className='flex'>
						<h2 className='border-b-2 border-lightBlue-600 w-full'>
							Lista de Carpetas
						</h2>
					</div>
				</>}
				emptyContent={<div className='flex justify-center items-center min-h-[200px] w-full'>No se encontro elementos</div>}
				classNames={classNames}
				hideHeader
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
						<Button className='bg-lightBlue-600 text-white' variant='solid' onPress={handleSubmitChanges} >
							Guardar
						</Button>
					</>
				}
			/>
		</>
	)
}
