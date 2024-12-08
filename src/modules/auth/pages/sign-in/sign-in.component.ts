import { ComponentBase, UIModule } from '@/app/common/components'
import { Component, OnInit, signal } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { toast } from 'ngx-sonner'
import { AuthFormComponent } from '../../components/auth-form/auth-form.component'
// import { CreateSessionService } from '../../core'

@Component({
  selector: 'app-sign-in',
  styleUrls: ['./sign-in.component.scss'],
  templateUrl: './sign-in.component.html',
  standalone: true,
  imports: [RouterModule, UIModule, TranslateModule, AuthFormComponent],
})
export class SignInComponent extends ComponentBase implements OnInit {
  // private readonly _createSessionService = inject(CreateSessionService)
  public getFullYear = signal<number>(new Date().getFullYear())

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(async (params) => {
      const sub = params['sub']
      const callback = params['callback']
      if (callback && sub) {
        await this.submit(sub)
      }
    })
  }

  public async submit(sub: string) {
    try {
      // await this._createSessionService.execute({ sub })
      this._router.navigate(['/app/home'])
    } catch (error: any) {
      toast.error('Error signing in', {
        description: error.error.message,
      })
    }
  }
}
