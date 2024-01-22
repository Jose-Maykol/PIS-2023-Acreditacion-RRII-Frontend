
import { User } from '@/types/User'
import UserTable from '../Table/UserTable'
import FilterUserTable from '../Filter/FilterUserTable'
import UserTableSkeleton from '../Skeletons/UserTableSkeleton'

interface UserTablePresentationProps {
  tableData: User[];
  isLoading: boolean;
  error: unknown;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSearchChange: (searchQuery: string) => void;
  onUsersChanged: () => void;
}

export default function UserTablePresentation({
	tableData,
	isLoading,
	error,
	currentPage,
	totalPages,
	onPageChange,
	onSearchChange,
	onUsersChanged
}: UserTablePresentationProps) {
	return (
		<div>
			{ isLoading
				? (
					<UserTableSkeleton rows={8} />
				)
				: error
					? (
						<div>Error</div>
					)
					: (
						<div className='flex flex-col gap-4'>
							<FilterUserTable
								handleUsersChanged={onUsersChanged}
								handleSearchChange={onSearchChange}
							/>
							<UserTable
								data={tableData}
								handleUsersChanged={onUsersChanged}
								currentPage={currentPage}
								totalPages={totalPages}
								handlePageChange={onPageChange}
							/>
						</div>
					)}
		</div>
	)
}