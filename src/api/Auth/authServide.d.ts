declare module '@/api/Auth/authService.js' {
import { GoogleResponseData, LogoutData } from '@/types/userTypes'

export class AuthService {
	googleLogin(params): Promise<GoogleResponseData>;
	logout(): Promise<LogoutData>;
}

const instance: AuthService
export default instance
}
