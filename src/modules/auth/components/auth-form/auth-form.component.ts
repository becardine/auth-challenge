import { FormComponent, UIModule } from '@/app/common/components'
import { Component, inject } from '@angular/core'
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { toast } from 'ngx-sonner'
import { SignInService } from '../../core/data/sign-in.service'
import { AuthenticateParams } from '../../core/entities/authenticate'

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [UIModule, TranslateModule, FormsModule, ReactiveFormsModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
})
export class AuthFormComponent extends FormComponent {
  private readonly _signInService = inject(SignInService)

  constructor() {
    super({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }

  public async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    const { email, password } = this.form.value

    const translationKeys = {
      successTitle: 'auth.main.sign-in.form.toasts.success.title',
      successDescription: 'auth.main.sign-in.form.toasts.success.description',
      failedTitle: 'auth.main.sign-in.form.toasts.failed.title',
      failedDescription: 'auth.main.sign-in.form.toasts.failed.description',
    }

    const translations = await this._translationService.getTranslations([
      translationKeys.successTitle,
      translationKeys.successDescription,
      translationKeys.failedTitle,
      translationKeys.failedDescription,
    ])

    try {
      await this.load(async () => {
        const params: AuthenticateParams = { email, password }
        await this._signInService.execute(params)
        toast.success(translations[translationKeys.successTitle], {
          description: translations[translationKeys.successDescription],
        })
        this._router.navigate(['/app/home'])
      })
    } catch (error: any) {
      toast.error(translations[translationKeys.failedTitle], {
        description:
          error.error.title ?? translations[translationKeys.failedDescription],
      })
    }
  }
}
