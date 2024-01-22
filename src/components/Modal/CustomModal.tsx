import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'

interface CustomModalProps {
	header: React.ReactNode
	body: React.ReactNode
	footer?: React.ReactNode
	size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
	classNames?: any
	modalPlacement?: 'center' | 'top' | 'bottom' | 'auto' | 'top-center' | 'bottom-center'
	isDismissable?: boolean
	isOpen: boolean
	onClose: () => void
}

const CustomModal = ({ header, body, footer, size = 'md', classNames, modalPlacement = 'center', isDismissable = false, isOpen, onClose }: CustomModalProps) => {
	return (
		<Modal size={size} isOpen={isOpen} onOpenChange={onClose} classNames={classNames} placement={modalPlacement} isDismissable={!isDismissable}>
			<ModalContent>
				{() => (
					<>
						<ModalHeader className='flex flex-col gap-1'>{header}</ModalHeader>
						<ModalBody>{body}</ModalBody>
						<ModalFooter>{footer}</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}

export default CustomModal
