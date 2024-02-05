import { ImprovementPlans } from '@/types/ImprovementPlan'
import { Pagination, Spinner } from '@nextui-org/react'
import MyImprovementPlansTable from '../Table/MyImprovementPlansTable'
import FilterMyImprovementPlansTable from '../Filter/FilterMyImprovementPlansTable'



interface MyImprovementPlansTablePresentationProps {
  tableData: ImprovementPlans[]
  isLoading: boolean
  isFetching: boolean
  error: unknown
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onSearchChange: (searchQuery: string) => void
  onImprovementPlansChanged: () => void
}

export default function MyImprovementPlansTablePresentation({
	tableData,
	isLoading,
	isFetching,
	error,
	currentPage,
	totalPages,
	onPageChange,
	onSearchChange,
	onImprovementPlansChanged
}: MyImprovementPlansTablePresentationProps) {
	return (
		<div>
			{ error
				? (
					<div>Error</div>
				)
				: (
					<div className='flex flex-col gap-4'>
						<FilterMyImprovementPlansTable
							handleSearchChange={onSearchChange}
						/>
						{ isLoading && isFetching
							? (
								<div className='min-h-[445px] h-[445px] w-full flex justify-center content-center'>
									<Spinner />
								</div>
							)
							: (
								<MyImprovementPlansTable
									data={tableData}
									handleUsersChanged={onImprovementPlansChanged}
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