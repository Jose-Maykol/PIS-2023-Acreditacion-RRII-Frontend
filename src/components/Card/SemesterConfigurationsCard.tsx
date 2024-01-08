import { Button } from '@nextui-org/react'
import PlusIcon from '../Icons/PlusIcon'
import PencilIcon from '../Icons/PencilIcon'
import CloseIcon from '../Icons/CloseIcon'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'


export default function SemesterConfigurationsCard() {
	const { year, semester } = useYearSemesterStore()
	const [isCreateSemesterOpen, setCreateSemesterOpen] = useState(false)
	const [isEditSemesterOpen, setEditSemesterOpen] = useState(false)
	const [isCloseSemesterOpen, setCloseSemesterOpen] = useState(false)

	const CreateSemesterModal = dynamic(() => import('@/components/Modal/Panel/CreateSemesterModal'), { ssr: false })
	const EditSemesterModal = dynamic(() => import('@/components/Modal/Panel/EditSemesterModal'), { ssr: false })
	const CloseSemesterModal = dynamic(() => import('@/components/Modal/Panel/CloseSemesterModal'), { ssr: false })

	const handleCreateSemesterOpen = () => {
		setCreateSemesterOpen(true)
		setEditSemesterOpen(false)
		setCloseSemesterOpen(false)
	}

	const handleEditSemesterOpen = () => {
		setCreateSemesterOpen(false)
		setEditSemesterOpen(true)
		setCloseSemesterOpen(false)
	}

	const handleCloseSemesterOpen = () => {
		setCloseSemesterOpen(true)
		setCreateSemesterOpen(false)
		setEditSemesterOpen(false)
	}

	return (
		<div className='flex-1 rounded-lg p-4 border border-lightBlue-600 border-dashed w-[500px] min-w-[300px]'>
			<div className='flex flex-row justify-between items-center w-full'>
				<h2 className='text-lg font-semibold text-lightBlue-600'>Configurar semestre actual</h2>
				<Button
					color='primary'
					isIconOnly
					startContent={<PlusIcon width={20} height={20} fill='fill-white'/>}
					onPress={handleCreateSemesterOpen}
				/>
				<CreateSemesterModal isOpen={isCreateSemesterOpen} onOpenChange={setCreateSemesterOpen}/>
			</div>
			<div className='pt-4 flex justify-between items-center gap-4'>
				<p>{year} - {semester}</p>
				<div>
					<Button
						isIconOnly
						startContent={<PencilIcon width={16} height={16} fill='fill-lightBlue-600'/>}
						onPress={handleEditSemesterOpen}
					>
					</Button>
					<EditSemesterModal isOpen={isEditSemesterOpen} onOpenChange={setEditSemesterOpen}/>
					<Button
						isIconOnly
						startContent={<CloseIcon width={18} height={18} fill='fill-red-500'/>}
						onPress={handleCloseSemesterOpen}
					/>
					<CloseSemesterModal isOpen={isCloseSemesterOpen} onOpenChange={setCloseSemesterOpen}/>
				</div>
			</div>
		</div>
	)
}