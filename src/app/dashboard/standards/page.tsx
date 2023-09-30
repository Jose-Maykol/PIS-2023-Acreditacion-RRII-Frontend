export default function StandardsIdPage({ params }: { params: { id: string } }) {
	const { id } = params

	return (
		<div>
      Aqui se muestra el estandar {id}
		</div>
	)
}