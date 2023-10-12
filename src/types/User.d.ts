export interface User {
  id: number,
  name: string,
  lastname: string,
  email: string,
}

export interface AuthUser {
  token: string,
  picture: string,
  role: string,
  user: User,
}
