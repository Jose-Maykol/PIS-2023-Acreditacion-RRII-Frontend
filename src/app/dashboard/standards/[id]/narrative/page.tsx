"use client"

import React, { useState } from "react";
import CustomModal from "@/components/Modal/CustomModal"
import { Button } from '@nextui-org/react';
import { useToast } from "@/hooks/ToastContext";

export default function StandardsPage() {
	const [isModalOpen, setModalOpen] = useState(false);

	const handleOpenModal = () => {
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	const handleDeleteArticle = () => {
		// Aquí iría la lógica para eliminar el artículo
		console.log("Artículo eliminado");
		handleCloseModal();
	};

	const demoToast = useToast();

	return (
		<div className="w-[96%] h-full bg-white m-auto">
			Aqui se muestran la lista de narrativas
			<div>
				<Button onClick={handleOpenModal}>Eliminar artículo</Button>

				<CustomModal
					isOpen={isModalOpen}
					onClose={handleCloseModal}
					header="Confirmar eliminación"
					body="¿Estás seguro de que deseas eliminar este artículo?"
					footer={
						<>
							<Button color="danger" variant="flat" onPress={handleCloseModal}>
								Cancelar
							</Button>
							<Button color="primary" onPress={handleDeleteArticle}>
								Confirmar
							</Button>
						</>
					}
				/>

				<button
					onClick={() => demoToast.showToast('Mensaje de éxito', 'danger')}
					className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
				>
					Mostrar Toast
				</button>
			</div>
		</div>
	)
}