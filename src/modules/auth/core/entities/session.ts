export class Session {
  public readonly session_id: string | null = null
  public readonly user_id: string | null = null
  public readonly session_token: string | null = null

  constructor(params: SessionParams) {
    this.session_id = params.session_id ?? null
    this.user_id = params.user_id ?? null
    this.session_token = params.session_token ?? null
  }

  public toJSON(): SessionParams {
    return {
      session_id: this.session_id,
      user_id: this.user_id,
      session_token: this.session_token,
    }
  }
}

export type SessionRequest = {
  sub: string
}

export type SessionResponse = {
  session: Session
}

export interface SessionParams {
  session_id: string | null
  user_id: string | null
  session_token: string | null
}
