import { planItem } from '@/types/PlanMejora'
import { Button, Input } from '@nextui-org/react'
import { ChangeEvent, useEffect, useState } from 'react'

import DynamicInputItem from './DynamicInputItem'
import PlusIcon from '@/components/Icons/PlusIcon'

export default function DynamicInput({
	identifier,
	label,
	onChange,
	defaultValues
}: {
	identifier: string
	label: string
	onChange: (formDataField: string, value: planItem[]) => void
	defaultValues: planItem[]
}) {
	const [singleInputValue, setSingleInputValue] = useState('')
	const [inputValues, setInputValues] = useState<planItem[]>(defaultValues)

	useEffect(() => {
		setInputValues(defaultValues)
		console.log('Render')
	}, [defaultValues])

	const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
		setSingleInputValue(ev.target.value)
	}

	const handleAdd = () => {
		if (singleInputValue.trim() === '') {
			console.log('Agrega texto')
			return
		}

		const newInputValues = [...inputValues, { id: Date.now(), description: singleInputValue }]
		setInputValues(newInputValues)
		onChange(identifier, newInputValues)
		setSingleInputValue('')
	}

	const handleDelete = (id: number) => {
		const updatedInputValues = inputValues.filter((item) => item.id !== id)
		setInputValues(updatedInputValues)
		onChange(identifier, updatedInputValues)
	}

	const handleUpdate = (id: number, description: string) => {
		const updatedInputValues = inputValues.map((item) =>
			item.id === id ? { ...item, description } : item
		)
		setInputValues(updatedInputValues)
		onChange(identifier, updatedInputValues)
	}

	return (
		<div>
			<div className='flex items-center gap-3'>
				<Input
					id={identifier}
					name={identifier}
					value={singleInputValue}
					onChange={handleChange}
					className='mb-3'
					label={label}
					placeholder='Agrega uno o varios elementos'
					size='sm'
					type='text'
					variant='underlined'
				/>
				<Button isIconOnly color='primary' aria-label='Add' variant='solid' onClick={handleAdd}>
					<PlusIcon width={15} height={15} fill='fill-white' />
				</Button>
			</div>
			<div>
				{inputValues.map((item) => (
					<DynamicInputItem
						key={item.id}
						inputItem={item}
						onDelete={handleDelete}
						onUpdate={handleUpdate}
					/>
				))}
			</div>
		</div>
	)
}
