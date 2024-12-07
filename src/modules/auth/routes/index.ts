import { Route } from '@angular/router'
import { isLoggedOutGuard } from '../guards'

export function routesAuth(): Route[] {
  return [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
      path: 'login',
      canActivate: [isLoggedOutGuard()],
      // component: SignInComponent,
    },
    {
      path: 'register',
      canActivate: [isLoggedOutGuard()],
      // component: RegisterComponent,
    },
  ]
}
