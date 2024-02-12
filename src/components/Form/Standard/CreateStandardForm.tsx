import LoadStandardsModal from '@/components/Modal/StandardManagement/LoadStandardsModal'
import { Standard } from '@/types/Standard'
import { Button, Textarea } from '@nextui-org/react'
import { useEffect, useState } from 'react'


interface CreateStandardFormProps {
	addStandard: (newStandard: Standard) => void,
	editingStandard?: Standard | null,
	saveEditedStandard?: (editedStandard: Standard) => void,
	setStandards: (standards: Standard[]) => void
}

export default function CreateStandardForm({
	addStandard,
	editingStandard,
	saveEditedStandard,
	setStandards
}: CreateStandardFormProps) {
	useEffect(() => {
		if (editingStandard) {
			setStandard(editingStandard)
		} else {
			setStandard({
				name: '',
				description: '',
				factor: '',
				dimension: '',
				related_standards: '',
				is_editing: false
			})
		}
	}, [editingStandard])

	const [standard, setStandard] = useState<Standard>({
		name: '',
		description: '',
		factor: '',
		dimension: '',
		related_standards: ''
	})

	const [isValid, setIsValid] = useState<boolean|null>(null)

	const onPressButtonStandard = () => {
		if (editingStandard) {
			saveEditedStandard && saveEditedStandard(standard)
		} else {
			if (standard.name === '') {
				setIsValid(false)
			} else {
				setIsValid(true)
				addStandard(standard)
				setStandard({
					name: '',
					description: '',
					factor: '',
					dimension: '',
					related_standards: ''
				})
			}
		}
	}

	return (
		<div className='border border-neutral-200 rounded-md p-4 shadow-lg flex flex-col gap-2 w-full'>

			<Textarea
				minRows={1}
				radius='sm'
				variant='bordered'
				isRequired
				isInvalid={isValid === false}
				errorMessage={isValid !== false ? '' : 'Este campo es requerido'}
				label='Nombre de estándar'
				labelPlacement='outside'
				placeholder='Ingrese el nombre del estándar'
				value={standard.name}
				onValueChange={(value) => setStandard({ ...standard, name: value })}
				className='w-full'
			/>
			<Textarea
				minRows={3}
				radius='sm'
				variant='bordered'
				label='Descripcion'
				labelPlacement='outside'
				placeholder='Ingrese la descripción del estándar'
				value={standard.description}
				onValueChange={(value) => setStandard({ ...standard, description: value })}
				className='w-full'
			/>
			<div className='flex flex-row w-full gap-2'>
				<Textarea
					minRows={2}
					radius='sm'
					variant='bordered'
					label='Factor'
					labelPlacement='outside'
					placeholder='Ingrese el factor del estándar'
					value={standard.factor}
					onValueChange={(value) => setStandard({ ...standard, factor: value })}
					className='w-1/2'
				/>
				<Textarea
					minRows={2}
					radius='sm'
					variant='bordered'
					label='Dimensión'
					labelPlacement='outside'
					placeholder='Ingrese la dimensión del estándar'
					value={standard.dimension}
					onValueChange={(value) => setStandard({ ...standard, dimension: value })}
					className='w-1/2'
				/>
			</div>
			<Textarea
				minRows={3}
				radius='sm'
				variant='bordered'
				label='Estándares relacionados'
				labelPlacement='outside'
				placeholder='Ingrese los estándares relacionados'
				value={standard.related_standards}
				onValueChange={(value) => setStandard({ ...standard, related_standards: value })}
				className='w-full'
			/>
			<div className='flex flex-row justify-end w-full gap-2'>
				<LoadStandardsModal setStandards={setStandards} />
				<Button
					color='primary'
					onPress={onPressButtonStandard}
				>
					{editingStandard ? 'Editar estándar' : 'Agregar estándar'}
				</Button>
			</div>
		</div>
	)
}