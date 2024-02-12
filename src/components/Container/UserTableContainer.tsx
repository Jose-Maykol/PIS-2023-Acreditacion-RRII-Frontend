import { UsersService } from '@/api/Users/usersService'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import UserTablePresentation from '../Presentation/UserTablePresentation'
import { useDebouncedCallback } from 'use-debounce'

export default function UserTableContainer() {
	const [currentPage, setCurrentPage] = useState(1)
	const [searchQuery, setSearchQuery] = useState('')
	const [totalPages, setTotalPages] = useState(1)

	const { data, isLoading, error, refetch, isFetching } = useQuery(
		['users', currentPage, searchQuery],
		() => UsersService.list({
			page: currentPage,
			search: searchQuery,
			items: 8
		}),
		{
			keepPreviousData: true
		}
	)

	useEffect(() => {
		if (data) {
			setTotalPages(data?.data.last_page)
		}
	}, [data])

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
			tableData={data?.data.users || []}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			currentPage={currentPage}
			totalPages={totalPages}
			onPageChange={handlePageChange}
			onSearchChange={handleSearchChange}
			onUsersChanged={handleUserChange}
		/>
	)
}