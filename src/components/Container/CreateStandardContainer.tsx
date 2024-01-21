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
		console.log('standards dajksdkajsjk', standards)
		setStandards((prevStandards) => prevStandards.filter((item) => item.id !== id))
	}

	const editStandard = (standard: Standard) => {
		console.log('estandar a esditar', standard)
		setEditingStandard(standard)
	}

	const saveEditedStandard = (editedStandard: Standard) => {
		setStandards((prevStandards) =>
			prevStandards.map((item) =>
				item.id === editedStandard.id ? editedStandard : item
			)
		)
		setEditingStandard(null)
	}

	/* const onSubmit = (e: any) => {
		e.preventDefault()
	} */

	return (
		<>
			<CreateStandardForm
				addStandard={addStandard}
				editingStandard={editingStandard}
				saveEditedStandard={saveEditedStandard}
			/>
			<CreateStandardTable
				standards={standards}
				editStandard={editStandard}
				deleteStandard={deleteStandard}
			/>
		</>
	)
}