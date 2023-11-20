import { toast } from 'react-toastify'

type toastType = 'info' | 'success' | 'warning' | 'error' | 'default'

const showToast = (type: toastType, message: string) => {
	switch (type) {
	case 'info':
		toast.info(message, {
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			isLoading: false,
			theme: 'light'
		})
		break
	case 'success':
		toast.success(message, {
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			isLoading: false,
			theme: 'light'
		})
		break
	case 'warning':
		toast.warning(message, {
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			isLoading: false,
			theme: 'light'
		})
		break
	case 'error':
		toast.error(message, {
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			isLoading: false,
			theme: 'light'
		})
		break
	default:
		toast(message, {
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			isLoading: false,
			theme: 'light'
		})
	}

	return null
}

export default showToast
