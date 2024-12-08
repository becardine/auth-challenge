import { FormComponent, UIModule } from '@/app/common/components'
import { Component } from '@angular/core'
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [UIModule, TranslateModule, FormsModule, ReactiveFormsModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
})
export class AuthFormComponent extends FormComponent {
  // private readonly _magicLinkService = inject(MagicLinkService)

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

    // const { email } = this.form.value

    const translationKeys = {
      successTitle: 'auth.main.form.email.toasts.success.title',
      successDescription: 'auth.main.form.email.toasts.success.description',
      failedTitle: 'auth.main.form.email.toasts.failed.title',
      failedDescription: 'auth.main.form.email.toasts.failed.description',
    }

    const translations = await this._translationService.getTranslations([
      translationKeys.successTitle,
      translationKeys.successDescription,
      translationKeys.failedTitle,
      translationKeys.failedDescription,
    ])

    await this.load(async () => {
      // const params: MagicLinkParams = { email }
      // this._magicLinkService.execute(params).then(() => {
      //   toast.success(translations[translationKeys.successTitle], {
      //     description: translations[translationKeys.successDescription],
      //   })
      // })
    }).catch((error) => {
      toast.error(translations[translationKeys.failedTitle], {
        description:
          translations[translationKeys.failedDescription] + error.message,
      })
    })
  }
}
