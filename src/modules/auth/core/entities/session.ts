export class Session {
  public readonly user_id: string | null = null
  public readonly session_token: string | null = null

  constructor(params: SessionParams) {
    this.user_id = params.user_id ?? null
    this.session_token = params.session_token ?? null
  }

  public toJSON(): SessionParams {
    return {
      user_id: this.user_id,
      session_token: this.session_token,
    }
  }
}

export type SessionRequest = {
  email: string
  password: string
}

export interface SessionResponse {
  accessToken: string
  id: string
}

export interface SessionParams {
  user_id: string | null
  session_token: string | null
}
