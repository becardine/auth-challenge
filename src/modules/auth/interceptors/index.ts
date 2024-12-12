import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { defer, switchMap } from 'rxjs'
import { AuthService } from '../core'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)

  // Verifica se a requisição deve ignorar o fluxo padrão
  if (req.headers.has('X-Bypass-Interceptor')) {
    const temporaryToken = req.headers
      .get('Authorization')
      ?.replace('Bearer ', '')
    return next(
      req.clone({
        setHeaders: { Authorization: `Bearer ${temporaryToken}` },
        headers: req.headers.delete('X-Bypass-Interceptor'),
      }),
    )
  }

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
