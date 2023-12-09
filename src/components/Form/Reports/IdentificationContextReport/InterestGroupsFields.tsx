import { Input } from '@nextui-org/react'

const InterestGroupsFields = () => {
	return (
		<div>
			<div className='flex flex-col mb-3'>
				<label className='text-default-600 text-sm ml-1'>Interesado:</label>
				<Input id='name' name='name' size='sm' type='text' />
			</div>
		</div>
	)
}

export default InterestGroupsFields
