import { useState } from 'react'
import CreateStandardForm from '../Form/Standard/CreateStandardForm'
import CreateStandardTable from '../Table/CreateStandardTable'
import { Standard } from '@/types/Standard'
import { StandardService } from '@/api/Estandar/StandardService'
import { useToast } from '@/hooks/toastProvider'
import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'
import TrashIcon from '../Icons/TrashIcon'
import SaveIcon from '../Icons/SaveIcon'


export default function CreateStandardContainer() {
	const [standards, setStandards] = useState<Standard[]>([])
	const [editingStandard, setEditingStandard] = useState<Standard | null>(null)
	const { showToast, updateToast } = useToast()
	const router = useRouter()

	const addStandard = (newStandard: Standard) => {
		setStandards((prevStandards) => [
			...prevStandards,
			{ ...newStandard, id: prevStandards.length + 1, nro_standard: prevStandards.length + 1 }
		])
	}

	const deleteStandard = (id: number) => {
		setStandards((prevStandards) => {
			const newStandards = prevStandards.filter((item) => item.id !== id)
			const updatedStandards = newStandards.map((item, index) => ({
				...item,
				nro_standard: index + 1
			}))
			return updatedStandards
		})
	}

	const editStandard = (standard: Standard) => {
		setEditingStandard(standard)
		setStandards((prevStandards) => {
			const newStandards = prevStandards.map((item) => ({
				...item,
				is_editing: item.id === standard.id
			}))
			return newStandards
		})
	}

	const saveEditedStandard = (editedStandard: Standard) => {
		setStandards((prevStandards) =>
			prevStandards.map((item) =>
				item.id === editedStandard.id ? editedStandard : item
			)
		)
		setEditingStandard(null)
	}

	const saveStandards = () => {
		const notification = showToast('Procesando...')
		StandardService.createVarious(standards).then((res) => {
			if (res.status === 1) {
				updateToast(notification, res.message, 'success')
			} else {
				updateToast(notification, res.message, 'error')
			}
		})
		router.push('/dashboard/admin')
	}

	return (
		<div className='flex flex-col gap-4'>
			<CreateStandardForm
				addStandard={addStandard}
				editingStandard={editingStandard}
				saveEditedStandard={saveEditedStandard}
				setStandards={setStandards}
			/>
			<CreateStandardTable
				standards={standards}
				editStandard={editStandard}
				deleteStandard={deleteStandard}
			/>
			<div className='flex flex-row gap-2 justify-end py-2'>
				<Button
					color='danger'
					startContent={<TrashIcon width={20} height={20} fill='fill-white' />}
					onPress={() => router.push('/dashboard/admin')}
				>
					Cancelar
				</Button>
				<Button
					color='primary'
					startContent={<SaveIcon width={20} height={20} fill='fill-white' />}
					onPress={saveStandards}
				>
					Guardar
				</Button>
			</div>
		</div>
	)
}