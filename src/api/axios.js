import axios from 'axios'
import { SERVER_PATH } from '../../config'

const api = axios.create({
  baseURL: `${SERVER_PATH}/api`,
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// Interceptor de solicitud: se ejecuta antes de que la solicitud sea enviada
api.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem('access_token')
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor de respuesta: se ejecuta después de que la respuesta sea recibida
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token')
      // useHistory().push('/auth')
    }
    return Promise.reject(error)
  }
)

export default api
