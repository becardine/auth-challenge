import { ComponentBase, UIModule } from '@/app/common/components'
import { Component, inject, OnInit, signal } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { toast } from 'ngx-sonner'
import { AuthFormComponent } from '../../components/auth-form/auth-form.component'
import { ConfirmEmailService } from '../../core'
// import { CreateSessionService } from '../../core'

@Component({
  selector: 'app-sign-in',
  styleUrls: ['./sign-in.component.scss'],
  templateUrl: './sign-in.component.html',
  standalone: true,
  imports: [RouterModule, UIModule, TranslateModule, AuthFormComponent],
})
export class SignInComponent extends ComponentBase implements OnInit {
  private readonly _confirmEmailService = inject(ConfirmEmailService)
  public getFullYear = signal<number>(new Date().getFullYear())

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(async (params) => {
      const email = params['email']
      const callback = params['callback']
      console.log(email, callback)
      if (callback && email) {
        await this.submit(email, callback)
      }
    })
  }

  public async submit(email: string, token: string): Promise<void> {
    try {
      await this._confirmEmailService.execute({ email, token })
      this._router.navigate(['/app/home'])
    } catch (error: any) {
      toast.error('Error signing in', {
        description: error.error.message,
      })
    }
  }
}
