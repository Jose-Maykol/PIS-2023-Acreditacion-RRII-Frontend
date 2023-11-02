import PencilIcon from '@/components/Icons/PencilIcon'
import SaveIcon from '@/components/Icons/SaveIcon'
import TrashIcon from '@/components/Icons/TrashIcon'
import { planItem } from '@/types/PlanMejora'
import { Button, Input } from '@nextui-org/react'
import { ChangeEvent, useState } from 'react'

export default function DynamicInputItem({
	inputItem,
	onDelete,
	onUpdate
}: {
	inputItem: planItem
	onDelete: (id: number) => void
	onUpdate: (id: number, description: string) => void
}) {
	const { id, description } = inputItem
	const [isEditing, setIsEditing] = useState(false)
	const [singleInputValue, setSingleInputValue] = useState(description)

	const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
		setSingleInputValue(ev.target.value)
	}

	const handleSaveUpdate = () => {
		setIsEditing(!isEditing)

		if (isEditing) {
			onUpdate(id, singleInputValue)
		}
	}

	return (
		<div className='flex gap-2 mb-2'>
			<Input
				size='sm'
				type='text'
				value={singleInputValue}
				onChange={handleChange}
				disabled={!isEditing}
			/>
			<Button
				isIconOnly
				color='success'
				aria-label='Edit'
				variant='flat'
				onClick={handleSaveUpdate}
			>
				{isEditing ? <SaveIcon width={16} height={16} /> : <PencilIcon width={16} height={16} />}
			</Button>
			<Button
				isIconOnly
				color='danger'
				aria-label='Delete'
				variant='flat'
				onClick={() => onDelete(id)}
			>
				<TrashIcon width={16} height={16} />
			</Button>
		</div>
	)
}
