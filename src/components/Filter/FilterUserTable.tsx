import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@nextui-org/react'
import SearchIcon from '../Icons/SearchIcon'
import ChevronDownIcon from '../Icons/ChevronDownIcon'
import AddUserModal from '../Modal/User/AddUserModal'
import { useState } from 'react'

interface FilterUserTableProps {
  handleUsersChanged: () => void;
  handleSearchChange: (searchQuery: string) => void;
}

export default function FilterUserTable({
	handleUsersChanged,
	handleSearchChange
}: FilterUserTableProps) {
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
				placeholder='Buscar por nombre'
				startContent={<SearchIcon width={15} height={15} fill='fill-gray-600'/>}
				value={searchQuery}
				onValueChange={onSearchChange}
			/>
			<div className='flex gap-3'>
				<AddUserModal onUserChanged={handleUsersChanged}/>
			</div>
		</div>
	)
}