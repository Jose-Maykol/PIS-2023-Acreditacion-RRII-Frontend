import { PlanMejoraService } from '@/api/PlanMejora/PlanMejoraService'
import { useYearSemesterStore } from '@/store/useYearSemesterStore'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useDebouncedCallback } from 'use-debounce'
import MyImprovementPlansTablePresentation from '../Presentation/MyImprovementPlansTablePresentation'

export default function MyImprovementPlansTableContainer() {
	const { year, semester } = useYearSemesterStore()
	const [currentPage, setCurrentPage] = useState(1)
	const [searchQuery, setSearchQuery] = useState('')
	const [totalPages, setTotalPages] = useState(1)

	const { data, isLoading, error, refetch, isFetching } = useQuery(
		['myImprovementPlans', year, semester, currentPage, searchQuery],
		() => PlanMejoraService.readUser({
			page: currentPage,
			search: searchQuery,
			items: 10
		}), {
			keepPreviousData: true,
			staleTime: Infinity,
			enabled: !!year && !!semester
		}
	)

	const handleImprovementPlanChange = () => {
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

	useEffect(() => {
		if (data) {
			setTotalPages(data?.data.last_page)
		}
	}, [data])

	return (
		<MyImprovementPlansTablePresentation
			tableData={data?.data.improvement_plans || []}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			currentPage={currentPage}
			totalPages={totalPages}
			onPageChange={handlePageChange}
			onSearchChange={handleSearchChange}
			onImprovementPlansChanged={handleImprovementPlanChange}
		/>
	)
}