import { useState } from 'react'
import CreateStandardForm from '../Form/Standard/CreateStandardForm'
import CreateStandardTable from '../Table/CreateStandardTable'
import { Standard } from '@/types/Standard'


export default function CreateStandardContainer() {
	const [standards, setStandards] = useState<Standard[]>([])
	const [editingStandard, setEditingStandard] = useState<Standard | null>(null)

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

	return (
		<>
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
		</>
	)
}