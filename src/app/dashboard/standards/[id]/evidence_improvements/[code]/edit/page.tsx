interface ImprovementPlanEditPageProps {
	params: {
		code: string
	}
}

export default function ImprovementPlanEditPage({ params }: ImprovementPlanEditPageProps) {
	return <h1>Editing Improvement Plan with code {params.code}</h1>
}
