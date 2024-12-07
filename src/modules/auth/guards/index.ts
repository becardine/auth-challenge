import { inject } from '@angular/core'
import { Router, type CanActivateFn } from '@angular/router'
import { AuthService } from '../core'

export function isLoggedGuard(): CanActivateFn {
  return async (_, state) => {
    const router = inject(Router)
    const authService = inject(AuthService)

    if (await authService.isLogged()) {
      return true
    }

    if (!router.url.includes('auth')) {
      return router.parseUrl(`/auth?redirect=${state.url}`)
    }

    return router.parseUrl('/auth')
  }
}

export function isLoggedOutGuard(): CanActivateFn {
  return async () => {
    const router = inject(Router)
    const authService = inject(AuthService)

    if (!(await authService.isLogged())) {
      return true
    }

    return router.parseUrl('/')
  }
}
