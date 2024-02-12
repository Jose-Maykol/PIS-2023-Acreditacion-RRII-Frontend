import { IdentificationContextStep } from '@/types/Reports'
import { Progress } from '@nextui-org/react'

const IdentificationContextProgress = ({
	currentStep,
	steps
}: {
	currentStep: number
	steps: Array<IdentificationContextStep>
}) => {
	const percentage = (100 / (steps.length - 1)) * (currentStep - 1)

	return (
		<div className='relative'>
			<Progress
				className=''
				size='md'
				aria-label='Loading...'
				value={percentage}
				classNames={{
					track: 'drop-shadow-md bg-gray-300',
					indicator: 'bg-blue-400'
				}}
			/>

			{steps.map((_, index) => (
				<div
					key={index}
					className={
						'z-20 cursor-pointer absolute top-1/2 -translate-x-1/2 transform w-5 h-5 rounded-full bg-blue-500'
					}
					style={{ left: `${index * 33.33}%`, marginTop: '-0.55rem' }}
				></div>
			))}
		</div>
	)
}

export default IdentificationContextProgress
