
export default function EditorSkeleton () {
	return (
		<div className='flex flex-col gap-4 justify-between animate-pulse'>
			<div className='h-3 w-20 mt-8 rounded-md bg-gray-200'/>
			<div className='flex flex-row justify-between h-10 pb-4 w-full gap-2'>
				<div className='h-10 w-full rounded-md bg-gray-200'/>
				<div className='h-10 w-20 rounded-md bg-gray-200'/>
			</div>
			<div className='w-full h-[600px] rounded-md bg-gray-200'/>
			<div className='w-full h-10 flex flex-row justify-end gap-2 mt-100 self-end'>
				<div className='h-10 w-[108px] rounded-md bg-gray-200'></div>
				<div className='h-10 w-[108px] rounded-md bg-gray-200'></div>
			</div>
		</div>
	)
}