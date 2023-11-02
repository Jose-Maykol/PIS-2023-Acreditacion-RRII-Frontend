import PlusIcon from '@/components/Icons/PlusIcon'
import { Button, Input } from '@nextui-org/react'
import DynamicInputItem from './DynamicInputItem'
import { ChangeEvent, useState } from 'react'
import { planItem } from '@/types/PlanMejora'

export default function DynamicInput({ identifier, label }: { identifier: string; label: string }) {
	const [singleInputValue, setSingleInputValue] = useState('')
	const [inputValues, setInputValues] = useState<planItem[]>([])

	const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
		setSingleInputValue(ev.target.value)
	}

	const handleAdd = () => {
		if (singleInputValue.trim() === '') {
			console.log('Agrega texto')
			return
		}

		const newInputValue = { id: Date.now(), description: singleInputValue }
		setInputValues([...inputValues, newInputValue])
		setSingleInputValue('')
	}

	const handleDelete = (id: number) => {
		const updatedInputValues = inputValues.filter((item) => item.id !== id)
		setInputValues(updatedInputValues)
	}

	const handleUpdate = (id: number, description: string) => {
		setInputValues((prevItems) =>
			prevItems.map((item) => (item.id === id ? { ...item, description } : item))
		)
	}

	return (
		<div>
			<div className='flex items-center gap-3'>
				<Input
					isRequired
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
