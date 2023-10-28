import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'

interface CustomModalProps {
	header: React.ReactNode
	body: React.ReactNode
	footer?: React.ReactNode
	size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
	classNames?: any
	isOpen: boolean
	onClose: () => void
}

const CustomModal = ({ header, body, footer, size = 'md', classNames, isOpen, onClose }: CustomModalProps) => {
	return (
		<Modal size={size} isOpen={isOpen} onOpenChange={onClose} classNames={classNames}>
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
