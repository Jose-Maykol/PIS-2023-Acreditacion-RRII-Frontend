import { Input, Tooltip } from '@nextui-org/react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FacultyStaffPart3Fields = ({ formik }: { formik: any }) => {
	return (
		<div className='flex flex-col gap-y-5 mx-10 pb-5'>
			<div>
				<Tooltip
					color='foreground'
					placement='top-start'
					content='Ingrese el número para cada situación'
					closeDelay={100}
				>
					<h2 className='mb-3' style={{ fontWeight: 'bold' }}>
						Población Estudiantil
					</h2>
				</Tooltip>

				<div className='grid grid-cols-4 gap-4'>
					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Vacantes:
						</label>
						<Input
							id='number_vacancies'
							name='number_vacancies'
							value={formik.values.number_vacancies}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={formik.touched.number_vacancies && Boolean(formik.number_vacancies)}
							errorMessage={formik.touched.number_vacancies && formik.errors.number_vacancies}
							size='sm'
							type='number'
							className='w-16 ml-2'
						/>
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Postulantes:
						</label>
						<Input
							id='number_applicants'
							name='number_applicants'
							value={formik.values.number_applicants}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={formik.touched.number_applicants && Boolean(formik.number_applicants)}
							errorMessage={formik.touched.number_applicants && formik.errors.number_applicants}
							size='sm'
							type='number'
							className='w-16 ml-2'
						/>
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Ingresantes:
						</label>
						<Input
							id='number_admitted_candidates'
							name='number_admitted_candidates'
							value={formik.values.number_admitted_candidates}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={
								formik.touched.number_admitted_candidates &&
								Boolean(formik.number_admitted_candidates)
							}
							errorMessage={
								formik.touched.number_admitted_candidates &&
								formik.errors.number_admitted_candidates
							}
							size='sm'
							type='number'
							className='w-16 ml-2'
						/>
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[70px]'>
							Matriculados:
						</label>
						<Input
							id='number_enrolled_students'
							name='number_enrolled_students'
							value={formik.values.number_enrolled_students}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={
								formik.touched.number_enrolled_students && Boolean(formik.number_enrolled_students)
							}
							errorMessage={
								formik.touched.number_enrolled_students && formik.errors.number_enrolled_students
							}
							size='sm'
							type='number'
							className='w-16 ml-2'
						/>
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Egresados:
						</label>
						<Input
							id='number_graduates'
							name='number_graduates'
							value={formik.values.number_graduates}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={formik.touched.number_graduates && Boolean(formik.number_graduates)}
							errorMessage={formik.touched.number_graduates && formik.errors.number_graduates}
							size='sm'
							type='number'
							className='w-16 ml-2'
						/>
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Graduados:
						</label>
						<Input
							id='number_alumni'
							name='number_alumni'
							value={formik.values.number_alumni}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={formik.touched.number_alumni && Boolean(formik.number_alumni)}
							errorMessage={formik.touched.number_alumni && formik.errors.number_alumni}
							size='sm'
							type='number'
							className='w-16 ml-2'
						/>
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Titulados:
						</label>
						<Input
							id='number_degree_recipients'
							name='number_degree_recipients'
							value={formik.values.number_degree_recipients}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={
								formik.touched.number_degree_recipients && Boolean(formik.number_degree_recipients)
							}
							errorMessage={
								formik.touched.number_degree_recipients && formik.errors.number_degree_recipients
							}
							size='sm'
							type='number'
							className='w-16 ml-2'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
