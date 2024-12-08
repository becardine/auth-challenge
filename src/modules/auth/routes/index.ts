import { Route } from '@angular/router'
import { isLoggedOutGuard } from '../guards'
import { SignInComponent } from '../pages/sign-in/sign-in.component'

export function routesAuth(): Route[] {
  return [
    { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
    {
      path: 'sign-in',
      canActivate: [isLoggedOutGuard()],
      component: SignInComponent,
    },
    // {
    //   path: 'register',
    //   canActivate: [isLoggedOutGuard()],
    //   // component: RegisterComponent,
    // },
  ]
}
