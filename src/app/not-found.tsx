import Image from 'next/image'
import notFoundImage from '../../public/img/404.webp'
import Link from 'next/link'

export default async function NotFoundPage() {
	return (
		<div className='flex flex-row justify-center h-screen w-screen'>
			<div className='bg-lightBlue-600 flex items-center justify-center w-[90%] h-full'>
				<Image
					alt='404'
					src={notFoundImage}
					width={600}
					height={600}
				/>
			</div>
			<div className='bg-white w-full h-full flex items-center justify-center'>
				<div className='flex flex-col justify-center items-center gap-4'>
					<h1 className='text-2xl font-bold text-gray-700 uppercase'>ops! nosotros no podemos encontrar esta página</h1>
					<h2 className='text-xl font-semibold text-gray-500'>Tal vez puedas encontrar lo que necesites aqui</h2>
					<div className='flex flex-row justify-center gap-6 mt-5'>
						<Link className='bg-lightBlue-600 py-2 px-8 text-white rounded-lg' href='/auth/login'> Iniciar sesión </Link>
						<Link className='bg-lightBlue-600 py-2 px-8 text-white rounded-lg' href='/dashboard'> Dashboard </Link>
					</div>
				</div>
			</div>
		</div>
	)
}