import { Button, Input } from '@nextui-org/react'
import PencilIcon from '@/components/Icons/PencilIcon'
import TrashIcon from '@/components/Icons/TrashIcon'
import React, { ChangeEvent, useState } from 'react'
import SaveIcon from '@/components/Icons/SaveIcon'
import { ItemValue } from '@/types/PlanMejora'

// TODO: Check Delete handler
type DynamicInputItemProps = {
	item: ItemValue
	onDelete: (index: number) => void
	indexOnList: number
	onUpdate: (value: ItemValue, index: number) => void
}

export default function DynamicInputItem({
	item,
	onDelete,
	indexOnList,
	onUpdate
}: DynamicInputItemProps) {
	const [isEditing, setIsEditing] = useState(false)
	const [value, setValue] = useState(item.description)
	const [error, setError] = useState(false)

	const handleEditSave = () => {
		if (isEditing) {
			if (value.trim() === '') {
				setError(true)
			} else {
				setError(false)
				setIsEditing(false)
				onUpdate({ description: value }, indexOnList)
			}
		} else {
			setIsEditing(true)
		}
	}

	const handleDelete = () => {
		onDelete(indexOnList)
	}

	const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
		const { value } = ev.target

		if (value.trim().length > 0) {
			setError(false)
		}

		setValue(value)
	}

	return (
		<div className='flex gap-2 mb-2'>
			<Input
				size='sm'
				type='text'
				value={value}
				onChange={handleChange}
				disabled={!isEditing}
				isInvalid={error}
				errorMessage={error && 'El campo no puede estar vacío'}
			/>
			<Button isIconOnly color='success' aria-label='Edit' variant='flat' onClick={handleEditSave}>
				{isEditing ? <SaveIcon width={16} height={16} /> : <PencilIcon width={16} height={16} />}
			</Button>
			<Button isIconOnly color='danger' aria-label='Delete' variant='flat' onClick={handleDelete}>
				<TrashIcon width={16} height={16} />
			</Button>
		</div>
	)
}
