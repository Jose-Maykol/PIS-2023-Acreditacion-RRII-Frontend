"use client"

import React, { useState } from "react"
import { Button } from "@nextui-org/react"
import ContentWrapper from "@/components/ContentWrapper/ContentWrapper"
import BookMarkIcon from "@/components/Icons/BookMarkIcon"

export default function DashboardPage() {
	const [openModal, setOpenModal] = useState(false);

	return (
		<div className='h-full'>
			<ContentWrapper className="bg-lightBlue-600 p-5 h-[400px]">
				<div className="flex items-center gap-1 pt-16 pl-6">
					<BookMarkIcon width={100} height={100} fill="fill-white" variant="line"/>
					<div className="text-white">
						<h1>Mis planes de mejora</h1>
						<p className="text-lg">Aqui se muestran los planes de mejora que creaste y modificaste</p>
					</div>
				</div>
			</ContentWrapper>
			<ContentWrapper className="bg-white p-2 h-screen -top-32 w-[96%] m-auto rounded-md">
				<div>Seccion de listado de mis planes</div>
			</ContentWrapper>
		</div>
	)
}