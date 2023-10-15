import { PlusIcon } from '@/components/Icons/PlusIcon'
import { Button, Input } from '@nextui-org/react'
import { ChangeEvent, useState } from 'react'
import DynamicInputItem from './DynamicInputItem'

type DynamicInputProps = {
	identifier: string
	label: string
}

// TODO: Create global type
export type ItemValue = {
	id: string
	description: string
}

export default function DynamicInput({ identifier, label }: DynamicInputProps) {
	const [error, setError] = useState(false)
	const [singleInputValue, setSingleInputValue] = useState('')
	const [inputValues, setInputValues] = useState(Array<ItemValue>)
	const [counter, setCounter] = useState(0)

	const handleAdd = () => {
		if (singleInputValue.trim() === '') {
			setError(true)
		} else {
			setError(false)
			setInputValues((prevValues) => [
				...prevValues,
				{ id: `${identifier}-${counter}`, description: singleInputValue }
			])
			setSingleInputValue('')
			setCounter((counter) => counter + 1)
		}
	}

	const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
		const { value } = ev.target

		if (value.trim().length > 0) {
			setError(false)
		}

		setSingleInputValue(value)
	}

	// console.log(inputValues)

	return (
		<div>
			<div className='flex items-center gap-3'>
				<Input
					isRequired
					id={identifier}
					name={identifier}
					className='mb-3'
					label={label}
					placeholder='Uno o varios'
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
				{inputValues.map((item: ItemValue, index: number) => (
					<DynamicInputItem key={index} item={item} />
				))}
			</div>
		</div>
	)
}
