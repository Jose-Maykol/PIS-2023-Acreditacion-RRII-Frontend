import { PlusIcon } from '@/components/Icons/PlusIcon'
import { Button, Input } from '@nextui-org/react'
import { ChangeEvent, useState } from 'react'

type DynamicInputProps = {
	identifier: string
	label: string
}

type ItemValue = {
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
			const newValues = [
				...inputValues,
				{ id: `${identifier}-${counter}`, description: singleInputValue }
			]
			setInputValues(newValues)
			setSingleInputValue('')
			setCounter((c) => c + 1)
		}
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
			<hr />
			<div>
				{/* TODO: Change for item component */}
				{inputValues.map((item: ItemValue) => (
					<h1 key={item.id}>{item.description}</h1>
				))}
			</div>
		</div>
	)
}
