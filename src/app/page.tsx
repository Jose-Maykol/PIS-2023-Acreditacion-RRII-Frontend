export default function Home() {
	const datos = [
		{
			id: 1,
			estandar: 'Propósitos',
			encargados: [
				{ nombre: 'Walter', email: 'wll@gmail.com' },
				{ nombre: 'Luis', email: 'pepe@gmail.com' }
			]
		},
		{
			id: 2,
			estandar: 'Objetivos',
			encargados: [
				{ nombre: 'Ana', email: 'ana@gmail.com' },
				{ nombre: 'Pedro', email: 'pedro@gmail.com' }
			]
		}
	]

	return (
		<div className='container mx-auto mt-10'>
			<table className='min-w-full bg-white border border-gray-300'>
				<thead>
					<tr>
						<th className='py-2 px-4 border-b border-gray-300'>ID</th>
						<th className='py-2 px-4 border-b border-gray-300'>Estandar</th>
						<th className='py-2 px-4 border-b border-gray-300'>Encargados</th>
						<th className='py-2 px-4 border-b border-gray-300'>Operaciones</th>
					</tr>
				</thead>
				<tbody>
					{datos.map((dato) => (
						<tr key={dato.id}>
							<td className='py-2 px-4 border-b border-gray-300'>{dato.id}</td>
							<td className='py-2 px-4 border-b border-gray-300'>{dato.estandar}</td>
							<td className='py-2 px-4 border-b border-gray-300'>
								{dato.encargados.map((encargado) => (
									<div key={encargado.email}>
										{encargado.nombre} - {encargado.email}
									</div>
								))}
							</td>
							<td className='py-2 px-4 border-b border-gray-300'>
								<button className='bg-blue-500 text-white px-4 py-1 rounded mr-2'>Editar</button>
								<button className='bg-red-500 text-white px-4 py-1 rounded'>Eliminar</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
