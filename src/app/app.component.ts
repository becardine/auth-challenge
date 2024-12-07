import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { UIModule } from './common/components'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UIModule],
  template: ` <router-outlet />

    @defer {
      <app-toaster />
    }`,
})
export class AppComponent {
  title = 'auth-challenge'
}
