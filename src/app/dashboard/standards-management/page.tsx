import ContentWrapper from "@/components/ContentWrapper/ContentWrapper"

const page = () => {
  return (
    <div className='h-full'>
			<ContentWrapper className="bg-lightBlue-600 p-5 h-[400px]">
				<div className="flex items-center gap-1 pt-16 pl-8">
					<div className="text-white">
						<h1>administracion de estandares</h1>
						<p className="text-lg">seccion de asignacion de responsables de los estandares</p>
					</div>
				</div>
			</ContentWrapper>
			<ContentWrapper className="bg-white p-2 h-screen -top-32 w-[96%] m-auto rounded-md">
				<div>Seccion de lista de estandares</div>
			</ContentWrapper>
		</div>
  )
}

export default page