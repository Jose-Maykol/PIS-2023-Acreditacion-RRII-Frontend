/* eslint-disable multiline-ternary */
import PlusIcon from '@/components/Icons/PlusIcon'
import { Button, Input, ScrollShadow, Tooltip } from '@nextui-org/react'
import DynamicInputItem from './DynamicInputItem'
import { ChangeEvent, useState } from 'react'
import { planItem } from '@/types/PlanMejora'

export default function DynamicInput({
	identifier,
	placeholder,
	tooltip,
	onChange
}: {
	identifier: string
	placeholder: string
	tooltip: string
	onChange: (formDataField: string, value: planItem[]) => void
}) {
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

	const renderInputItems = () => {
		return inputValues.map((item) => (
			<DynamicInputItem
				key={item.id}
				inputItem={item}
				onDelete={handleDelete}
				onUpdate={handleUpdate}
			/>
		))
	}

	return (
		<div>
			<div className='flex items-center gap-3'>
				<Tooltip color='foreground' placement='top-start' content={tooltip} >
					<Input
						id={identifier}
						name={identifier}
						value={singleInputValue}
						onChange={handleChange}
						className='mb-3'
						placeholder={placeholder}
						size='sm'
						type='text'
						variant='underlined'
					/>
				</Tooltip>
				<Button isIconOnly color='primary' aria-label='Add' variant='solid' onClick={handleAdd}>
					<PlusIcon width={15} height={15} fill='fill-white' />
				</Button>
			</div>
			{inputValues.length <= 2 ? (
				<div> {renderInputItems()} </div>
			) : (
				<ScrollShadow hideScrollBar size={7} className='h-[140px]'>
					{renderInputItems()}
				</ScrollShadow>
			)}
		</div>
	)
}
