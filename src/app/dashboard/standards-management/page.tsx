import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import TableStandardSkeleton from '@/components/Skeletons/StandardTableSkeleton'
import dynamic from 'next/dynamic'

const StandardManagementPage = () => {
	const StandardTable = dynamic(() => import('@/components/Table/StandardTable'), {
		ssr: false,
		loading: () => <TableStandardSkeleton/>
	})
	return (
		<ContentWrapper className='bg-white h-[670px] -top-24 w-[96%] m-auto rounded-md py-5 px-10 flex flex-col'>
			<div className='flex w-full mb-5'>
				<h2 className='text-xl font-semibold uppercase'>Encargados de estándares del sistema</h2>
			</div>
			<StandardTable />
		</ContentWrapper>
	)
}

export default StandardManagementPage