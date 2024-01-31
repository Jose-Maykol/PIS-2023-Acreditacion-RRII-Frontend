import { Input, Tooltip } from '@nextui-org/react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FacultyStaffPart2Fields = ({ formik }: { formik: any }) => {
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
						Investigadores distinguidos:
					</label>
					<Input
						id='distinguished_researcher'
						name='distinguished_researcher'
						value={formik.values.distinguished_researcher}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						isInvalid={
							formik.touched.distinguished_researcher && Boolean(formik.distinguished_researcher)
						}
						errorMessage={
							formik.touched.distinguished_researcher && formik.errors.distinguished_researcher
						}
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
						<Input
							id='researcher_level_i'
							name='researcher_level_i'
							value={formik.values.researcher_level_i}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={formik.touched.researcher_level_i && Boolean(formik.researcher_level_i)}
							errorMessage={formik.touched.researcher_level_i && formik.errors.researcher_level_i}
							size='sm'
							type='number'
							className='w-16 ml-2'
						/>
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Nivel II:
						</label>
						<Input
							id='researcher_level_ii'
							name='researcher_level_ii'
							value={formik.values.researcher_level_ii}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={formik.touched.researcher_level_ii && Boolean(formik.researcher_level_ii)}
							errorMessage={formik.touched.researcher_level_ii && formik.errors.researcher_level_ii}
							size='sm'
							type='number'
							className='w-16 ml-2'
						/>
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Nivel III:
						</label>
						<Input
							id='researcher_level_iii'
							name='researcher_level_iii'
							value={formik.values.researcher_level_iii}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={
								formik.touched.researcher_level_iii && Boolean(formik.researcher_level_iii)
							}
							errorMessage={
								formik.touched.researcher_level_iii && formik.errors.researcher_level_iii
							}
							size='sm'
							type='number'
							className='w-16 ml-2'
						/>
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Nivel IV:
						</label>
						<Input
							id='researcher_level_iv'
							name='researcher_level_iv'
							value={formik.values.researcher_level_iv}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={formik.touched.researcher_level_iv && Boolean(formik.researcher_level_iv)}
							errorMessage={formik.touched.researcher_level_iv && formik.errors.researcher_level_iv}
							size='sm'
							type='number'
							className='w-16 ml-2'
						/>
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Nivel V:
						</label>
						<Input
							id='researcher_level_v'
							name='researcher_level_v'
							value={formik.values.researcher_level_v}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={formik.touched.researcher_level_v && Boolean(formik.researcher_level_v)}
							errorMessage={formik.touched.researcher_level_v && formik.errors.researcher_level_v}
							size='sm'
							type='number'
							className='w-16 ml-2'
						/>
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Nivel VI:
						</label>
						<Input
							id='researcher_level_vi'
							name='researcher_level_vi'
							value={formik.values.researcher_level_vi}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={formik.touched.researcher_level_vi && Boolean(formik.researcher_level_vi)}
							errorMessage={formik.touched.researcher_level_vi && formik.errors.researcher_level_vi}
							size='sm'
							type='number'
							className='w-16 ml-2'
						/>
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Nivel VII:
						</label>
						<Input
							id='researcher_level_vii'
							name='researcher_level_vii'
							value={formik.values.researcher_level_vii}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={
								formik.touched.researcher_level_vii && Boolean(formik.researcher_level_vii)
							}
							errorMessage={
								formik.touched.researcher_level_vii && formik.errors.researcher_level_vii
							}
							size='sm'
							type='number'
							className='w-16 ml-2'
						/>
					</div>
				</div>
			</div>

			<div className='mb-5'>
				<div className='flex items-center mb-3'>
					<label className='text-default-600 text-sm font-extrabold mr-3'>
						Número de publicaciones en Revistas Indizadas:
					</label>
					<Input
						id='number_publications_indexed'
						name='number_publications_indexed'
						value={formik.values.number_publications_indexed}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						isInvalid={
							formik.touched.number_publications_indexed &&
							Boolean(formik.number_publications_indexed)
						}
						errorMessage={
							formik.touched.number_publications_indexed &&
							formik.errors.number_publications_indexed
						}
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
					<Input
						id='intellectual_property_indecopi'
						name='intellectual_property_indecopi'
						value={formik.values.intellectual_property_indecopi}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						isInvalid={
							formik.touched.intellectual_property_indecopi &&
							Boolean(formik.intellectual_property_indecopi)
						}
						errorMessage={
							formik.touched.intellectual_property_indecopi &&
							formik.errors.intellectual_property_indecopi
						}
						size='sm'
						type='number'
						className='w-16 ml-auto'
					/>
				</div>

				<div className='flex items-center mb-3'>
					<label className='text-default-600 text-sm font-extrabold mr-3'>
						Número de proyectos de investigación con financiamiento institucional y externo – en
						ejecución:
					</label>
					<Input
						id='number_research_project_inexecution'
						name='number_research_project_inexecution'
						value={formik.values.number_research_project_inexecution}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						isInvalid={
							formik.touched.number_research_project_inexecution &&
							Boolean(formik.number_research_project_inexecution)
						}
						errorMessage={
							formik.touched.number_research_project_inexecution &&
							formik.errors.number_research_project_inexecution
						}
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
						id='number_research_project_completed'
						name='number_research_project_completed'
						value={formik.values.number_research_project_completed}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						isInvalid={
							formik.touched.number_research_project_completed &&
							Boolean(formik.number_research_project_completed)
						}
						errorMessage={
							formik.touched.number_research_project_completed &&
							formik.errors.number_research_project_completed
						}
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
						id='number_professor_inperson_academic_movility'
						name='number_professor_inperson_academic_movility'
						value={formik.values.number_professor_inperson_academic_movility}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						isInvalid={
							formik.touched.number_professor_inperson_academic_movility &&
							Boolean(formik.number_professor_inperson_academic_movility)
						}
						errorMessage={
							formik.touched.number_professor_inperson_academic_movility &&
							formik.errors.number_professor_inperson_academic_movility
						}
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
						id='number_professor_virtual_academic_movility'
						name='number_professor_virtual_academic_movility'
						value={formik.values.number_professor_virtual_academic_movility}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						isInvalid={
							formik.touched.number_professor_virtual_academic_movility &&
							Boolean(formik.number_professor_virtual_academic_movility)
						}
						errorMessage={
							formik.touched.number_professor_virtual_academic_movility &&
							formik.errors.number_professor_virtual_academic_movility
						}
						size='sm'
						type='number'
						className='w-16 ml-auto'
					/>
				</div>
				<hr />
			</div>
		</div>
	)
}
