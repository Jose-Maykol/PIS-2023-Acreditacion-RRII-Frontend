import { PlusIcon } from '@/components/Icons/PlusIcon'
import { Button, Input } from '@nextui-org/react'
import { ChangeEvent, useState } from 'react'
import DynamicInputItem from './DynamicInputItem'
import { DynamicInputGeneric } from './ImprovementPlanForm'

type DynamicInputProps = {
	identifier: string
	label: string
	onChange: (identifier: string, values: Array<DynamicInputGeneric>) => void
}

// TODO: Create global type
export type ItemValue = {
	description: string
}

export default function DynamicInput({ identifier, label, onChange }: DynamicInputProps) {
	const [error, setError] = useState(false)
	const [singleInputValue, setSingleInputValue] = useState('')
	const [inputValues, setInputValues] = useState(Array<ItemValue>)

	const handleAdd = () => {
		if (singleInputValue.trim() === '') {
			setError(true)
		} else {
			const newValues = [...inputValues, { description: singleInputValue }]
			setError(false)
			setInputValues(newValues)
			setSingleInputValue('')
			onChange(identifier, newValues)
		}
	}

	// TODO: Check Delete handler
	const handleDelete = (index: number) => {
		const newValues = [...inputValues]
		newValues.splice(index, 1)
		setInputValues(newValues)
	}

	const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
		const { value } = ev.target

		if (value.trim().length > 0) {
			setError(false)
		}

		setSingleInputValue(value)
	}

	return (
		<div>
			<div className='flex items-center gap-3'>
				<Input
					// isRequired
					id={identifier}
					name={identifier}
					className='mb-3'
					label={label}
					placeholder='Agrega uno o varios elementos'
					size='sm'
					type='text'
					variant='underlined'
					isInvalid={error}
					errorMessage={error && 'El campo no puede estar vacío'}
					value={singleInputValue}
					onChange={handleChange}
					// value={formik.values.problems_opportunities[0].description}
					// onChange={formik.handleChange}
					// onBlur={formik.handleBlur}
				/>
				<Button isIconOnly color='primary' aria-label='Add' variant='flat' onClick={handleAdd}>
					<PlusIcon />
				</Button>
			</div>
			<div>
				{/* TODO: Change for item component */}
				{inputValues?.map((item: ItemValue, index: number) => (
					<DynamicInputItem
						key={`${identifier}-${index}`}
						item={item}
						onDelete={handleDelete}
						indexOnList={index}
					/>
				))}
			</div>
		</div>
	)
}
