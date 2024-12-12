export class Authenticate {
  public readonly email: string | null = null
  public readonly password: string | null = null

  constructor(params: AuthenticateParams) {
    this.email = params.email ?? null
    this.password = params.password ?? null
  }

  public toJSON(): AuthenticateParams {
    return {
      email: this.email,
      password: this.password,
    }
  }
}

export interface AuthenticateParams {
  email: string | null
  password: string | null
}

export interface ConfirmEmailParams {
  email: string | null
  token: string | null
}
