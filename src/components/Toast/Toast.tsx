import React from 'react'
import InfoIcon from '../Icons/InfoIcon'
import WarningIcon from '../Icons/WarningIcon'
import SuccessIcon from '../Icons/SuccessIcon'
import DangerIcon from '../Icons/DangerIcon'
import CloseIcon from '../Icons/CloseIcon'
import { Button } from '@nextui-org/react'

type ToastProps = {
  message: string;
  onClose: () => void;
  variant?: 'info' | 'danger' | 'warning' | 'success' | 'default';
  autoClose?: boolean;
};

const Toast: React.FC<ToastProps> = ({ message, onClose, variant = 'default', autoClose = true }) => {
	const getIcon = () => {
		switch (variant) {
		case 'info':
			return <InfoIcon width={30} height={30} fill='fill-white' />
		case 'danger':
			return <DangerIcon width={30} height={30} fill='fill-white' />
		case 'warning':
			return <WarningIcon width={30} height={30} fill='fill-white' />
		case 'success':
			return <SuccessIcon width={30} height={30} fill='fill-white' />
		default:
			return ''
		}
	}

	const bgColor = () => {
		switch (variant) {
		case 'info':
			return 'bg-blue-500'
		case 'danger':
			return 'bg-red-500'
		case 'warning':
			return 'bg-yellow-500'
		case 'success':
			return 'bg-green-500'
		default:
			return 'bg-gray-500'
		}
	}

	return (
		<div className={`fixed top-8 right-8 w-1/3 h-20 z-50 p-4 rounded-xl shadow-lg ${bgColor()} transition transform duration-300 ease-in-out ${message ? 'translate-x-0' : 'translate-x-full'}`}>
			<div className='flex justify-between items-center'>
				<div className='flex items-center space-x-3'>
					<span>{getIcon()}</span>
					<span className='text-white text-xl capitalize'>{message}</span>
				</div>
				<Button isIconOnly className='rounded-full hover:bg-red-500' variant='light' onClick={onClose}>
					<CloseIcon width={20} height={20} fill='fill-gray-300 hover:fill-white' />
				</Button>
			</div>
		</div>
	)
}

export default Toast
