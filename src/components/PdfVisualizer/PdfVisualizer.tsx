import React from 'react'

const PdfVisualizer = ({ blobURL, setBlobURL }: { blobURL: string, setBlobURL: React.Dispatch<React.SetStateAction<string>> }) => {
	return (
		<div className='fixed top-0 right-0 w-1/2 h-screen bg-white rounded-lg p-4 z-50'>
			<button
				className='absolute top-2 right-3 w-7 h-7 rounded-full bg-red-500 text-white hover:text-red-500 hover:bg-white cursor-pointer'
				onClick={() => {
					setBlobURL('')
				}}
			>
            X
			</button>
			<div className='w-full h-full'>
				<embed
					src={blobURL}
					type='application/pdf'
					width='100%'
					height='100%'
				/>
			</div>
		</div>
	)
}

export default PdfVisualizer