interface ImprovementPlanDetailsPageProps {
	params: {
		code: string
	}
}

export default function ImprovementPlanDetailsPage({ params }: ImprovementPlanDetailsPageProps) {
	return <h1>Improvement Plan Details with code {params.code}</h1>
}
