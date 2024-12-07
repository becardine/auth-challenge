import { Injectable } from '@angular/core'
import { Session } from '../entities'

@Injectable()
export class AuthService {
  private _session: Session | null = null

  constructor() {}

  public async get(): Promise<Session | null> {
    if (this._session !== null) {
      return this._session
    }

    const session = localStorage.getItem('session')
    if (!session) return null

    return (this._session = new Session(JSON.parse(session)))
  }

  public async set(session: Session | null) {
    if (session === null) {
      localStorage.removeItem('session')
      localStorage.removeItem('access_token')
    } else {
      localStorage.setItem('session', JSON.stringify(session))
      localStorage.setItem('access_token', session.session_token ?? '')
    }

    this._session = session
  }

  public async getToken(): Promise<string | null> {
    return localStorage.getItem('access_token') ?? null
  }

  public async isLogged(): Promise<boolean> {
    return (await this.get()) !== null
  }

  public async logout(): Promise<void> {
    await this.set(null)
  }

  public async getUserId(): Promise<string | null> {
    const session = await this.get()
    if (session === null) return null
    return session.user_id
  }
}
