import { UsersService } from '@/api/Users/usersService'
import { useState } from 'react'
import { useQuery } from 'react-query'
import UserTablePresentation from '../Presentation/UserTablePresentation'
import { useDebouncedCallback } from 'use-debounce'

export default function UserTableContainer() {
	const [currentPage, setCurrentPage] = useState(1)
	const [searchQuery, setSearchQuery] = useState('')

	const { data, isLoading, error, refetch } = useQuery(
		['users', currentPage, searchQuery],
		() => UsersService.list({
			page: currentPage,
			search: searchQuery,
			items: 8
		})
	)

	const handleUserChange = () => {
		refetch()
	}

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

	const handleSearchChange = useDebouncedCallback(
		(value: string) => {
			setSearchQuery(value)
		},
		500
	)

	return (
		<UserTablePresentation
			tableData={data?.data.users}
			isLoading={isLoading}
			error={error}
			currentPage={currentPage}
			totalPages={data?.data.last_page}
			onPageChange={handlePageChange}
			onSearchChange={handleSearchChange}
			onUsersChanged={handleUserChange}
		/>
	)
}