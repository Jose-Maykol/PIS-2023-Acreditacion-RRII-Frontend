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
				// defaultValue={filterValue}
				// onClear={() => onClear()}
				value={searchQuery}
				onValueChange={onSearchChange}
			/>
			<div className='flex gap-3'>
				<Dropdown
					// mode='selector'
					// triggerClassName='hidden sm:flex'
					// items={statusOptions}
					// disallowEmptySelection
					closeOnSelect={false}
					// selectedKeys={statusFilter}
					// selectionMode='multiple'
					// onSelectionChange={setStatusFilter}
				>
					<DropdownTrigger>
						<Button endContent={<ChevronDownIcon width={10} height={10} />} variant='faded'>
              Roles
						</Button>
					</DropdownTrigger>
					<DropdownMenu
						variant='faded'
						aria-label='tipo de usuario'
						closeOnSelect={false}
						disallowEmptySelection
						selectionMode='multiple'
						// selectedKeys={selectedKeys}
						// onSelectionChange={setSelectedKeys}
					>
						<DropdownItem key='administrador'>Administrador</DropdownItem>
						<DropdownItem key='docente'>Docente</DropdownItem>
					</DropdownMenu>
				</Dropdown>
				<AddUserModal onUserChanged={handleUsersChanged}/>
			</div>
		</div>
	)
}