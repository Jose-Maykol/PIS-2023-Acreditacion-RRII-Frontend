import { Input, Tooltip } from '@nextui-org/react'

export const FacultyStaffPart2Fields = () => {
	return (
		<div className='flex flex-col gap-y-5 mx-10'>
			<div>
				<Tooltip
					color='foreground'
					placement='top-start'
					content='Ingrese el número para cada situación'
					closeDelay={100}
				>
					<h2 className='mb-3' style={{ fontWeight: 'bold' }}>
						Docentes Investigadores
					</h2>
				</Tooltip>

				<div className='flex items-center mb-3'>
					<label className='text-default-600 text-sm font-extrabold mr-3'>
						Invetigadores distinguidos:
					</label>
					<Input
						id='distinguished_researchers'
						name='distinguished_researchers'
						size='sm'
						type='number'
						className='w-16 ml-2'
					/>
				</div>

				<div className='grid grid-cols-4 gap-4'>
					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Nivel I:
						</label>
						<Input id='nivel1' name='nivel1' size='sm' type='number' className='w-16 ml-2' />
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Nivel II:
						</label>
						<Input id='nivel2' name='nivel2' size='sm' type='number' className='w-16 ml-2' />
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Nivel III:
						</label>
						<Input id='nivel3' name='nivel3' size='sm' type='number' className='w-16 ml-2' />
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Nivel IV:
						</label>
						<Input id='nivel4' name='nivel4' size='sm' type='number' className='w-16 ml-2' />
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Nivel V:
						</label>
						<Input id='nivel5' name='nivel5' size='sm' type='number' className='w-16 ml-2' />
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Nivel VI:
						</label>
						<Input id='nivel6' name='nivel6' size='sm' type='number' className='w-16 ml-2' />
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Nivel VII:
						</label>
						<Input id='nivel7' name='nivel7' size='sm' type='number' className='w-16 ml-2' />
					</div>
				</div>
			</div>

			<hr />

			<div className='mb-5'>
				<div className='flex items-center mb-3'>
					<label className='text-default-600 text-sm font-extrabold mr-3'>
						Número de publicaciones en Revistas Indizadas:
					</label>
					<Input
						id='indexed_publications'
						name='indexed_publications'
						size='sm'
						type='number'
						className='w-16 ml-auto'
					/>
				</div>

				<div className='flex items-center mb-3'>
					<label className='text-default-600 text-sm font-extrabold mr-3'>
						Propiedad intelectual por INDECOPI (total de patentes u otras modalidades de protección
						de invenciones o nuevas tecnologías):
					</label>
					<Input id='patents' name='patents' size='sm' type='number' className='w-16 ml-auto' />
				</div>

				<div className='flex items-center mb-3'>
					<label className='text-default-600 text-sm font-extrabold mr-3'>
						Número de proyectos de investigación con financiamiento institucional y externo – en
						ejecución:
					</label>
					<Input
						id='ongoing_research_projects'
						name='ongoing_research_projects'
						size='sm'
						type='number'
						className='w-16 ml-auto'
					/>
				</div>

				<div className='flex items-center mb-3'>
					<label className='text-default-600 text-sm font-extrabold mr-3'>
						Número de proyectos de investigación con financiamiento institucional y externo –
						culminadas:
					</label>
					<Input
						id='completed_research_projects'
						name='completed_research_projects'
						size='sm'
						type='number'
						className='w-16 ml-auto'
					/>
				</div>

				<div className='flex items-center mb-3'>
					<label className='text-default-600 text-sm font-extrabold mr-3'>
						Número de docentes que han realizado movilidad académica presencial:
					</label>
					<Input
						id='inperson_mibility'
						name='inperson_mibility'
						size='sm'
						type='number'
						className='w-16 ml-auto'
					/>
				</div>

				<div className='flex items-center mb-3'>
					<label className='text-default-600 text-sm font-extrabold mr-3'>
						Número de docentes que han realizado movilidad académica virtual:
					</label>
					<Input
						id='virtual_mobility'
						name='virtual_mobility'
						size='sm'
						type='number'
						className='w-16 ml-auto'
					/>
				</div>
			</div>
		</div>
	)
}
