
export default function UserTableSkeleton ({ rows = 8 }: { rows?: number }) {
	return (
		<div className='max-w-full h-[370px] space-y-4 rounded animate-pulse'>
			<div className='h-[40px] bg-gray-300 rounded-md dark:bg-gray-700 w-full'/>
			{ Array.from({ length: rows }, (_, i) => (
				<div key={i} className='flex flex-row items-center justify-between h-6 px-1'>
					<div className='h-4 bg-gray-300 rounded-md dark:bg-gray-700 w-4'/>
					<div className='h-2 bg-gray-300 rounded-md dark:bg-gray-700 w-24 mb-2'/>
					<div className='h-2 bg-gray-300 rounded-md dark:bg-gray-700 w-12'/>
					<div className='h-2 bg-gray-300 rounded-md dark:bg-gray-700 w-12'/>
					<div className='h-2 bg-gray-300 rounded-md dark:bg-gray-700 w-12'/>
					<div className='flex flex-row justify-center gap-2 w-40'>
						<div className='h-4 bg-gray-300 rounded-md dark:bg-gray-700 w-4'/>
						<div className='h-4 bg-gray-300 rounded-md dark:bg-gray-700 w-4'/>
					</div>
				</div>
			))}
		</div>
	)
}