import { isLoggedGuard, routesAuth } from '@/modules'
import { Routes } from '@angular/router'

export const routes: Routes = [
  { path: '', redirectTo: 'app/home', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: routesAuth,
  },
  {
    path: 'app',
    canActivate: [isLoggedGuard()],
    // component: LayoutComponent,
    children: [],
  },
]
