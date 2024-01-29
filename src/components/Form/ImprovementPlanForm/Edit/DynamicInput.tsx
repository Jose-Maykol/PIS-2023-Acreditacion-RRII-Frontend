/* eslint-disable multiline-ternary */
import { planItem } from '@/types/ImprovementPlan'
import { Button, Input, ScrollShadow, Tooltip } from '@nextui-org/react'
import { ChangeEvent, useEffect, useState } from 'react'

import DynamicInputItem from './DynamicInputItem'
import PlusIcon from '@/components/Icons/PlusIcon'

export default function DynamicInput({
	identifier,
	label,
	tooltip,
	onChange,
	defaultValues,
	formik
}: {
	identifier: string
	label: string
	tooltip: string
	onChange: (formDataField: string, value: planItem[]) => void
	defaultValues: planItem[]
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	formik: any
}) {
	const [singleInputValue, setSingleInputValue] = useState('')
	const [inputValues, setInputValues] = useState<planItem[]>(defaultValues)
	const [isEmptyValue, setIsEmptyValue] = useState(false)

	useEffect(() => {
		setInputValues(defaultValues)
	}, [defaultValues])

	const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
		setSingleInputValue(ev.target.value)

		if (ev.target.value.trim() !== '') {
			setIsEmptyValue(false)
		}
	}

	const handleAdd = () => {
		if (singleInputValue.trim() === '') {
			setIsEmptyValue(true)
			return
		}

		setIsEmptyValue(false)
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
			<div className='flex flex-col'>
				<Tooltip color='foreground' placement='top-start' content={tooltip} closeDelay={100}>
					<label className='text-default-600 text-sm mt-2'>
						{label}
					</label>
				</Tooltip>
				<div className='flex items-center gap-3'>
					<Input
						id={identifier}
						name={identifier}
						value={singleInputValue}
						onChange={handleChange}
						isInvalid={isEmptyValue}
						errorMessage={isEmptyValue && 'El campo no puede estar vacío'}
						className='mb-4'
						size='sm'
						type='text'
						variant='underlined'
						maxLength={255}
					/>
					<Button isIconOnly color='primary' aria-label='Add' variant='solid' onClick={handleAdd}>
						<PlusIcon width={15} height={15} fill='fill-white' />
					</Button>
				</div>
			</div>
			{formik.touched[identifier] && formik.errors[identifier] ? (
				<p style={{ color: '#F31260', fontSize: 12, marginTop: '-.75rem', marginLeft: '.25rem' }}>
					Campo requerido
				</p>
			) : null}
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
