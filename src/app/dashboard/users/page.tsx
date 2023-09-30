import ContentWrapper from "@/components/ContentWrapper/ContentWrapper"

export default function UsersPage() {
	return (
		<div className='h-full'>
			<ContentWrapper className="bg-lightBlue-600 p-5 h-[400px]">
				<div className="flex items-center gap-1 pt-16 pl-8">
					<div className="text-white">
						<h1>administracion de usuarios</h1>
						<p className="text-lg">seccion de usuarios del sistema</p>
					</div>
				</div>
			</ContentWrapper>
			<ContentWrapper className="bg-white p-2 h-screen -top-32 w-[96%] m-auto rounded-md">
				<div>Seccion de listado de usuarios</div>
			</ContentWrapper>
		</div>
	)
}