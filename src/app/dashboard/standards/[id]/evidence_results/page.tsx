import ContentWrapper from '@/components/ContentWrapper/ContentWrapper'
import EvidencesTable from '@/components/Table/EvidencesTable'

type EvidenceResultsPageParams = {
	params: {
		id: string
	}
}

export default function EvidenceResultsPage({ params }: EvidenceResultsPageParams) {
	return (
		<ContentWrapper className='bg-white h-[670px] w-[96%] m-auto rounded-md py-5 px-10'>
			{/* <div className='flex w-full mb-5'>
				<h2>Evidencia de Planes</h2>
			</div> */}
			<EvidencesTable id={params.id} typeEvidence='2' />
		</ContentWrapper>
	)
}
