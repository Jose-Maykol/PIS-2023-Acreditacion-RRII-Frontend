
export default function TableUserSkeleton ({ rows = 10 }: { rows?: number }) {
	return (
		<div className='max-w-full space-y-4 rounded animate-pulse'>
			<div className='h-10 w-full flex flex-row justify-between items-center content-center mb-8'>
				<div className='h-10 bg-gray-300 rounded-md dark:bg-gray-700 w-[480px]'/>
				<div className='flex flex-row justify-end gap-2'>
					<div className='h-10 bg-gray-300 rounded-md dark:bg-gray-700 w-[100px]'/>
					<div className='h-10 bg-gray-300 rounded-md dark:bg-gray-700 w-[140px]'/>
				</div>
			</div>
			<div className='h-12 bg-gray-300 rounded-s-md dark:bg-gray-700 w-full'/>
			{ Array.from({ length: rows }, (_, i) => (
				<div key={i} className='flex flex-row items-center justify-between h-6'>
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