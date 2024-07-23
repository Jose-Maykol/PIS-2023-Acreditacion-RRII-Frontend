/* eslint-disable @typescript-eslint/no-explicit-any */
import { EvidenceService } from '@/api/Evidence/EvidenceService'
import { Button } from '@nextui-org/react'
import { useState, ReactNode, useEffect, useMemo, useCallback, Key } from 'react'
import { useToast } from '@/hooks/toastProvider'
import CustomModal from '../CustomModal'
import { Evidence } from '@/types/Evidences'
import CustomTable from '@/components/Table/CustomTable'
import { getFileIcon, getCommonIcon } from '@/utils/utils'
import { EmptyEvidenceData } from '@/components/Table/EmptyEvidenceData'

interface MoveEvidenceModalProps {
	evidence: Evidence
	breadcrumbs: { name: string; path: string; key: number }[]
	openModal: boolean
	onCloseModal: () => void
	onReload: () => void
}

export default function MoveEvidenceModal({ evidence, breadcrumbs, openModal, onCloseModal, onReload } : MoveEvidenceModalProps) {
	const [folders, setFolders] = useState<Evidence[]>([])
	const [pathFolders] = useState<{ name: string; key: number }[]>([...breadcrumbs])
	const [params, setParams] = useState<number | null>(pathFolders.length === 1 ? null : pathFolders[pathFolders.length - 1].key)
	const [currentParams] = useState<number | null>(pathFolders.length === 1 ? null : pathFolders[pathFolders.length - 1].key)
	const [isActive, setIsActive] = useState<boolean>(true)
	const { showToast, updateToast } = useToast()
	const columns = [
		{ name: 'CARPETA', uid: 'name', sortable: true },
		{ name: 'ACCIONES', uid: 'actions' }
	]

	useEffect(() => {
		EvidenceService.folderList(
			{
				folder_id: params,
				standard_id: evidence.standard_id,
				evidence_type_id: evidence.evidence_type_id
			}
		).then((res) => {
			if (res.status === 1) {
				setFolders(res.data)
			} else {
				setFolders([])
			}
		})
	}, [params])

	const handleCloseModal = () => {
		onCloseModal()
		onReload()
	}

	const handleSubmitRow = async (params: number) => {
		await setParams(params)
		handleSubmitChanges()
	}

	const handleSubmitChanges = async () => {
		const notification = showToast('Procesando...')
		if (evidence?.type === 'evidence') {
			await EvidenceService.moveEvidence(String(evidence.file_id), {
				parent_id: params
			}).then((res) => {
				if (res.status === 1) {
					updateToast(notification, res.message, 'success')
				} else {
					updateToast(notification, res.message, 'error')
				}
			})
		} else {
			await EvidenceService.moveFolder(String(evidence.folder_id), {
				parent_id: params
			}).then((res) => {
				if (res.status === 1) {
					updateToast(notification, res.message, 'success')
				} else {
					updateToast(notification, res.message, 'error')
				}
			})
		}
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
				<div className='invisible flex relative items-center justify-end group-hover/item:visible'>
					<Button color='primary' size='sm' variant='light' onClick={() => handleSubmitRow(Number(folder.id))}>Mover</Button>
					<Button className='-rotate-90 bg-transparent' isIconOnly onClick={() => setParams(Number(folder.id))}>
						{getCommonIcon('chevron', 10, 'hover:bg-default-300')}
					</Button>
				</div>
			)
		}
	}, [])

	const classNames = useMemo(
		() => ({
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
			tr: ['hover:bg-default-300 group/item py-0']
		}),
		[]
	)

	const body: ReactNode = (
		<div className='h-full flex flex-col gap-3 max-h-[96%]'>
			<div className='flex gap-2 items-center'>
				<h3 className='text-gray-500'>Carpeta actual:</h3>
				<Button className='border-1 border-default-600 hover:bg-default-100' variant='bordered' size='sm' onClick={() => setParams(currentParams)} startContent={getFileIcon('', 'folder', 18, 'fill-default-600')}>
					{pathFolders[pathFolders.length - 1].name}
				</Button>
			</div>
			<CustomTable
				items={folders}
				columns={columns}
				renderCell={renderCell}
				topContent={<>
					<div className='flex flex-col'>
						<div className='flex'>
							<Button
								className={`${isActive ? 'bg-blue-200 text-primary after:content-[""] after:w-[90%] after:h-1 after:bg-blue-500' : 'bg-transparent text-default-600'} py-2 rounded-none border-none`}
								size='sm'
								onClick={() => {
									setIsActive(true)
									setParams(currentParams)
								}}>
									Carpeta Actual
							</Button>
							<Button
								className={`${!isActive ? 'bg-blue-200 text-primary' : 'bg-transparent text-default-600'} py-2 rounded-none border-none`}
								size='sm'
								onClick={() => {
									setIsActive(false)
									setParams(null)
								}}>
									Carpeta Raiz
							</Button>
						</div>
						<hr className='w-full'></hr>
					</div>
				</>}
				emptyContent={<EmptyEvidenceData description='No hay carpetas'/>}
				classNames={classNames}
				hideHeader
			/>
		</div>
	)

	return (
		<>
			<CustomModal
				isOpen={openModal}
				size='xl'
				onClose={handleCloseModal}
				header={header}
				body={body}
				footer={
					<>
						<Button color='danger' variant='flat' onPress={handleCloseModal}>
							Cancelar
						</Button>
						<Button className='bg-lightBlue-600 text-white' variant='solid' onPress={handleSubmitChanges}>
							Mover
						</Button>
					</>
				}
			/>
		</>
	)
}
