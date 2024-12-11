import { environment } from '@/environments/environment'
import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { firstValueFrom } from 'rxjs'
import { Session, SessionResponse } from '../entities'
import { AuthenticateParams } from '../entities/authenticate'
import { AuthService } from './auth.service'

@Injectable()
export class SignInService {
  private _httpClient = inject(HttpClient)
  private _authService = inject(AuthService)

  constructor() {}

  public async execute({ email, password }: AuthenticateParams): Promise<void> {
    const result = await firstValueFrom(
      this._httpClient.post<SessionResponse>(
        `${environment.apiBaseUrl}/auth/sign-in`,
        {
          email,
          password,
        },
      ),
    )

    if (result.accessToken && result.id) {
      this._authService.set(
        new Session({
          session_token: result.accessToken,
          user_id: result.id,
        }),
      )
    }
  }
}
