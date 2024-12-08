import { routesAuth, routesHome } from '@/modules'
import { Routes } from '@angular/router'
import { AppLayoutComponent } from './common/layouts/app/app-layout.component'

export const routes: Routes = [
  { path: '', redirectTo: 'app/home', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: routesAuth,
  },
  {
    path: 'app',
    // canActivate: [isLoggedGuard()],
    component: AppLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: routesHome,
      },
    ],
  },
]
