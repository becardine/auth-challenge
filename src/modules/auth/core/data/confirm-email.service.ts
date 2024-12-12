import { environment } from '@/environments/environment'
import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { firstValueFrom } from 'rxjs'
import { ConfirmEmailParams, Session, SessionResponse } from '../entities'
import { AuthService } from './auth.service'

@Injectable()
export class ConfirmEmailService {
  private _httpClient = inject(HttpClient)
  private _authService = inject(AuthService)

  constructor() {}

  public async execute({ email, token }: ConfirmEmailParams): Promise<void> {
    const result = await firstValueFrom(
      this._httpClient.post<SessionResponse>(
        `${environment.apiBaseUrl}/auth/confirm-email`,
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-Bypass-Interceptor': 'true',
          },
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
