export interface User {
  id: number,
  name: string,
  email: string,
  role: string,
  status: string,
}

export interface UserData {
  id: numberstring,
  name: string,
  lastname: string,
  email?: string,
  password?: string | nullstring,
  estado?: booleanstring,
  rol: string,
}

export interface UserAuth {
  access_token: string | nullstring,
  userData: UserDatastring,
  foto: string,
}

export interface RegistrationData {
  name?: string,
  lastname?: string,
  email: string,
  password?: string,
  rol?: string,
}

export interface ResponseData {
  status: boolean,
  data: {
    message: string,
    [key: string]: string | undefined,
  }
}

export interface GoogleResponseData {
  status: boolean,
  data: {
    message: string,
    access_token: string,
    image: string,
    role: string,
    user: {
      id: number,
      name: string,
      lastname: string,
      email: string,
    }
  }
}
export interface LogoutData {
  status: boolean,
  data: {
    message: string,
  }
}
