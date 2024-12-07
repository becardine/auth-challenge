import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { defer, switchMap } from 'rxjs'
import { AuthService } from '../core'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)

  return defer(async () => {
    return await authService.isLogged().then((isLogged) => {
      if (isLogged) {
        return authService.getToken()
      }

      return null
    })
  }).pipe(
    switchMap((token) => {
      if (token) {
        return next(
          req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }),
        )
      }

      return next(req)
    }),
  )
}
