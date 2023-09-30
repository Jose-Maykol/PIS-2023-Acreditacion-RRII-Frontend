import ContentWrapper from "@/components/ContentWrapper/ContentWrapper"
import HeaderStandards from "@/components/Header/HeaderStandards"

export default function StandardsIdPage({ params }: { params: { id: string } }) {
	const { id } = params

	return (
		<div className='h-full'>
			<ContentWrapper className="bg-lightBlue-600 p-4 h-full max-h-[550px]">
				<HeaderStandards id={id}/>
			</ContentWrapper>
			<ContentWrapper className="bg-white p-2 h-screen m-auto rounded-md">
				<div>Seccion de lista de estandares {id}</div>
			</ContentWrapper>
		</div>
	)
}