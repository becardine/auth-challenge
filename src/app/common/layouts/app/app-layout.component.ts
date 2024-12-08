import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ComponentBase } from '../../components'
import { DashboardWrapperComponent } from '../dashboard-wrapper.component'

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [RouterModule, DashboardWrapperComponent],
  template: `
    <app-dashboard-wrapper>
      <router-outlet></router-outlet>
    </app-dashboard-wrapper>
  `,
  styles: [],
})
export class AppLayoutComponent extends ComponentBase {}
