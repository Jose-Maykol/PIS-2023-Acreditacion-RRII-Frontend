import { useState } from 'react'
import SearchIcon from '../Icons/SearchIcon'
import { Input } from '@nextui-org/react'

interface FilterMyImprovementPlansTableProps {
  handleSearchChange: (searchQuery: string) => void;
}

export default function FilterMyImprovementPlansTable({
	handleSearchChange
}: FilterMyImprovementPlansTableProps) {
	const [searchQuery, setSearchQuery] = useState('')

	const onSearchChange = (value: string) => {
		setSearchQuery(value)
		handleSearchChange(value)
	}

	return (
		<div className='flex justify-between gap-3 items-end'>
			<Input
				isClearable
				className='w-full sm:max-w-[44%]'
				placeholder='Buscar por nombre o código'
				startContent={<SearchIcon width={15} height={15} fill='fill-gray-600'/>}
				value={searchQuery}
				onValueChange={onSearchChange}
			/>
			<div className='flex gap-3'>
				a
			</div>
		</div>
	)
}