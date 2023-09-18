import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { UserAuth } from '@/types/User'

interface UserContextType {
  userAuth: UserAuth;
  setUserAuth: (userAuth: UserAuth) => void;
  clearUserAuth: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode;
}

export const useUserContext = (): UserContextType => {
	const context = useContext(UserContext)
	if (!context) {
		throw new Error('useUserContext debe usarse dentro de un UserProvider')
	}
	return context
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const storedUserAuthString = localStorage.getItem('userAuth')

	// Comprueba si `storedUserAuthString` es una cadena válida
	const initialUserAuth = storedUserAuthString
		? JSON.parse(storedUserAuthString)
		: {
			access_token: null,
			userData: {
				id: 0,
				name: '',
				lastname: '',
				rol: ''
			},
			foto: ''
		}


	const [userAuth, setUserAuth] = useState<UserAuth>(initialUserAuth)

	const clearUserAuth = () => {
		setUserAuth({
			access_token: null,
			userData: {
				id: 0,
				name: '',
				lastname: '',
				rol: ''
			},
			foto: ''
		})
		localStorage.removeItem('userAuth')
		localStorage.removeItem('access_token')
	}

	useEffect(() => {
		localStorage.setItem('userAuth', JSON.stringify(userAuth))
	}, [userAuth])

	return (
		<UserContext.Provider value={{ userAuth, setUserAuth, clearUserAuth }}>
			{children}
		</UserContext.Provider>
	)
}
