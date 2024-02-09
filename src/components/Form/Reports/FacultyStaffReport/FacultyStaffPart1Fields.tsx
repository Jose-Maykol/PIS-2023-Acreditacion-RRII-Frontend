import { Input, Tooltip } from '@nextui-org/react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FacultyStaffPart1Fields = ({ formik }: { formik: any }) => {
	return (
		<div className='flex flex-col gap-y-5 mx-10'>
			<div className='flex items-center'>
				<label
					className='text-default-600 text-sm whitespace-nowrap mr-3'
					style={{ fontWeight: '900' }}
				>
					Número de docentes extraordinarios:
				</label>
				<Input
					id='number_extraordinary_professor'
					name='number_extraordinary_professor'
					value={formik.values.number_extraordinary_professor}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					isInvalid={
						formik.touched.number_extraordinary_professor &&
						Boolean(formik.number_extraordinary_professor)
					}
					errorMessage={
						formik.touched.number_extraordinary_professor &&
						formik.errors.number_extraordinary_professor
					}
					size='sm'
					type='number'
					className='w-16'
				/>
			</div>

			<div>
				<Tooltip
					color='foreground'
					placement='top-start'
					content='Ingrese el número para cada situación'
					closeDelay={100}
				>
					<h2 className='mb-3' style={{ fontWeight: 'bold' }}>
						Docentes Ordinarios
					</h2>
				</Tooltip>

				<div className='grid grid-cols-3 gap-4'>
					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Principales:
						</label>
						<Input
							id='number_ordinary_professor_main'
							name='number_ordinary_professor_main'
							value={formik.values.number_ordinary_professor_main}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={
								formik.touched.number_ordinary_professor_main &&
								Boolean(formik.number_ordinary_professor_main)
							}
							errorMessage={
								formik.touched.number_ordinary_professor_main &&
								formik.errors.number_ordinary_professor_main
							}
							size='sm'
							type='number'
							className='w-16 ml-2'
						/>
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Dedicación exclusiva:
						</label>
						<Input
							id='ordinary_professor_exclusive_dedication'
							name='ordinary_professor_exclusive_dedication'
							value={formik.values.ordinary_professor_exclusive_dedication}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={
								formik.touched.ordinary_professor_exclusive_dedication &&
								Boolean(formik.ordinary_professor_exclusive_dedication)
							}
							errorMessage={
								formik.touched.ordinary_professor_exclusive_dedication &&
								formik.errors.ordinary_professor_exclusive_dedication
							}
							size='sm'
							type='number'
							className='w-16 ml-2'
						/>
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Asociados:
						</label>
						<Input
							id='number_ordinary_professor_associate'
							name='number_ordinary_professor_associate'
							value={formik.values.number_ordinary_professor_associate}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={
								formik.touched.number_ordinary_professor_associate &&
								Boolean(formik.number_ordinary_professor_associate)
							}
							errorMessage={
								formik.touched.number_ordinary_professor_associate &&
								formik.errors.number_ordinary_professor_associate
							}
							size='sm'
							type='number'
							className='w-16 ml-2'
						/>
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Tiempo completo:
						</label>
						<Input
							id='ordinary_professor_fulltime'
							name='ordinary_professor_fulltime'
							value={formik.values.ordinary_professor_fulltime}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={
								formik.touched.ordinary_professor_fulltime &&
								Boolean(formik.ordinary_professor_fulltime)
							}
							errorMessage={
								formik.touched.ordinary_professor_fulltime &&
								formik.errors.ordinary_professor_fulltime
							}
							size='sm'
							type='number'
							className='w-16 ml-2'
						/>
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Auxiliares:
						</label>
						<Input
							id='number_ordinary_professor_assistant'
							name='number_ordinary_professor_assistant'
							value={formik.values.number_ordinary_professor_assistant}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={
								formik.touched.number_ordinary_professor_assistant &&
								Boolean(formik.number_ordinary_professor_assistant)
							}
							errorMessage={
								formik.touched.number_ordinary_professor_assistant &&
								formik.errors.number_ordinary_professor_assistant
							}
							size='sm'
							type='number'
							className='w-16 ml-2'
						/>
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[60px]'>
							Tiempo parcial:
						</label>
						<Input
							id='ordinary_professor_parttime'
							name='ordinary_professor_parttime'
							value={formik.values.ordinary_professor_parttime}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={
								formik.touched.ordinary_professor_parttime &&
								Boolean(formik.ordinary_professor_parttime)
							}
							errorMessage={
								formik.touched.ordinary_professor_parttime &&
								formik.errors.ordinary_professor_parttime
							}
							size='sm'
							type='number'
							className='w-16 ml-2'
						/>
					</div>
				</div>
			</div>

			<div className='mb-5'>
				<Tooltip
					color='foreground'
					placement='top-start'
					content='Ingrese el número para cada situación'
					closeDelay={100}
				>
					<h2 className='mb-3' style={{ fontWeight: 'bold' }}>
						Docentes Contratados
					</h2>
				</Tooltip>
				<div className='grid grid-cols-3 gap-4'>
					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[130px]'>
							Tiempo completo:
						</label>
						<Input
							id='contractor_professor_fulltime'
							name='contractor_professor_fulltime'
							value={formik.values.contractor_professor_fulltime}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={
								formik.touched.contractor_professor_fulltime &&
								Boolean(formik.contractor_professor_fulltime)
							}
							errorMessage={
								formik.touched.contractor_professor_fulltime &&
								formik.errors.contractor_professor_fulltime
							}
							size='sm'
							type='number'
							className='w-16 ml-2'
						/>
					</div>

					<div className='flex items-center'>
						<label className='text-default-600 text-sm font-extrabold mr-3 max-w-[130px]'>
							Tiempo parcial:
						</label>
						<Input
							id='contractor_professor_parttime'
							name='contractor_professor_parttime'
							value={formik.values.contractor_professor_parttime}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isInvalid={
								formik.touched.contractor_professor_parttime &&
								Boolean(formik.contractor_professor_parttime)
							}
							errorMessage={
								formik.touched.contractor_professor_parttime &&
								formik.errors.contractor_professor_parttime
							}
							size='sm'
							type='number'
							className='w-16 ml-2'
						/>
					</div>
				</div>
				<hr className='mt-5' />
			</div>
		</div>
	)
}
