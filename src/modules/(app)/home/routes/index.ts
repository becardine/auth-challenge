import { Route } from '@angular/router'
import { HomeComponent } from '../pages/home/home.component'

export function routesHome(): Route[] {
  return [{ path: '', component: HomeComponent }]
}
