import PlusIcon from '@/components/Icons/PlusIcon'
import { Button, Input } from '@nextui-org/react'
import DynamicInputItem from './DynamicInputItem'

export default function DynamicInput({ identifier, label }: { identifier: string; label: string }) {
	return (
		<div>
			<div className='flex items-center gap-3'>
				<Input
					isRequired
					id={identifier}
					name={identifier}
					className='mb-3'
					label={label}
					placeholder='Agrega uno o varios elementos'
					size='sm'
					type='text'
					variant='underlined'
				/>
				<Button isIconOnly color='primary' aria-label='Add' variant='solid' onClick={() => {}}>
					<PlusIcon width={15} height={15} fill='fill-white' />
				</Button>
			</div>
			<div>
				{[1].map((item, i) => (
					<DynamicInputItem key={i} />
				))}
			</div>
		</div>
	)
}
