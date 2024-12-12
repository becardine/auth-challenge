export class SignUp {
  public readonly email: string
  public readonly name: string
  public readonly password: string

  constructor(email: string, name: string, password: string) {
    this.email = email
    this.name = name
    this.password = password
  }

  public toJSON(): SignUpParams {
    return {
      email: this.email,
      name: this.name,
      password: this.password,
    }
  }
}

export interface SignUpParams {
  email: string
  name: string
  password: string
}

export interface SignUpResponse {
  accessToken: string
  id: string
}
