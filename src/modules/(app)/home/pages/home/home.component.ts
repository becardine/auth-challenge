import {
  DashboardPageComponent,
  DashboardPageHeaderComponent,
  DashboardPageHeaderTitleComponent,
  DashboardPageMainComponent,
} from '@/app/common'
import { ComponentBase, UIModule } from '@/app/common/components'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    RouterModule,
    UIModule,
    TranslateModule,
    DashboardPageComponent,
    DashboardPageHeaderComponent,
    DashboardPageHeaderTitleComponent,
    DashboardPageMainComponent,
  ],
})
export class HomeComponent extends ComponentBase {}
