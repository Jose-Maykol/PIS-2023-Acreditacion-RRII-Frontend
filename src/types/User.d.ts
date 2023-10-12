export interface User {
  id: number,
  name: string,
  lastname: string,
  email: string,
  status: number,
  role: string,
}
export interface AuthUser {
  token: string,
  picture: string,
  role: string,
  user: User,
}

export interface CreateUser {
  role: string,
  email: string,
}
