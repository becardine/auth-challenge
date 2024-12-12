import { environment } from '@/environments/environment'
import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { firstValueFrom } from 'rxjs'
import { Session, SignUpParams, SignUpResponse } from '../entities'
import { AuthService } from './auth.service'

@Injectable()
export class SignUpService {
  private _authService = inject(AuthService)
  private _httpClient = inject(HttpClient)

  constructor() {}

  public async execute({ email, name, password }: SignUpParams): Promise<void> {
    const result = await firstValueFrom(
      this._httpClient.post<SignUpResponse>(
        `${environment.apiBaseUrl}/auth/sign-up`,
        {
          email,
          name,
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
