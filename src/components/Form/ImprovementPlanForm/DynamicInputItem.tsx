import PencilIcon from '@/components/Icons/PencilIcon'
import SaveIcon from '@/components/Icons/SaveIcon'
import TrashIcon from '@/components/Icons/TrashIcon'
import { Button, Input } from '@nextui-org/react'
import { useState } from 'react'

export default function DynamicInputItem() {
	const [isEditing, setIsEditing] = useState(false)

	return (
		<div className='flex gap-2 mb-2'>
			<Input size='sm' type='text' />
			<Button isIconOnly color='success' aria-label='Edit' variant='flat' onClick={() => {}}>
				{isEditing ? <SaveIcon width={16} height={16} /> : <PencilIcon width={16} height={16} />}
			</Button>
			<Button isIconOnly color='danger' aria-label='Delete' variant='flat' onClick={() => {}}>
				<TrashIcon width={16} height={16} />
			</Button>
		</div>
	)
}
