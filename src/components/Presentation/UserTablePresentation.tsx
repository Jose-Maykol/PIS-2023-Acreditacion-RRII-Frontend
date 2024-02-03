
import { User } from '@/types/User'
import UserTable from '../Table/UserTable'
import FilterUserTable from '../Filter/FilterUserTable'
import UserTableSkeleton from '../Skeletons/UserTableSkeleton'
import { Pagination } from '@nextui-org/react'

interface UserTablePresentationProps {
  tableData: User[]
  isLoading: boolean
	isFetching: boolean
  error: unknown
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onSearchChange: (searchQuery: string) => void
  onUsersChanged: () => void
}

export default function UserTablePresentation({
	tableData,
	isLoading,
	isFetching,
	error,
	currentPage,
	totalPages,
	onPageChange,
	onSearchChange,
	onUsersChanged
}: UserTablePresentationProps) {
	return (
		<div>
			{ error
				? (
					<div>Error</div>
				)
				: (
					<div className='flex flex-col gap-4'>
						<FilterUserTable
							handleUsersChanged={onUsersChanged}
							handleSearchChange={onSearchChange}
						/>
						{ isLoading && isFetching
							? (
								<UserTableSkeleton />
							)
							: (
								<UserTable
									data={tableData}
									handleUsersChanged={onUsersChanged}
								/>
							)
						}
						<div className='flex w-full justify-center'>
							<Pagination
								isCompact
								showControls
								showShadow
								color='primary'
								page={currentPage}
								total={totalPages}
								onChange={onPageChange}
							/>
						</div>
					</div>
				)}
		</div>
	)
}