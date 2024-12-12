import { FormComponent, UIModule } from '@/app/common/components'
import { NgStyle } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { toast } from 'ngx-sonner'
import { SignUpParams, SignUpService } from '../../core'
import { PasswordStrengthService } from '../../core/data/password-strength.service'

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    UIModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgStyle,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent extends FormComponent implements OnInit {
  private readonly _signUpService = inject(SignUpService)
  private readonly _passwordStrengthService = inject(PasswordStrengthService)

  public passwordStrength: string = ''
  public passwordPercentage: number = 0

  constructor() {
    super({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit() {
    this.form.get('password')?.valueChanges.subscribe((value) => {
      const result = this._passwordStrengthService.evaluatePassword(value)
      this.passwordStrength = result.strength
      this.passwordPercentage = result.percentage
    })
  }

  getStrengthColor(strength: string): string {
    switch (strength) {
      case 'very strong':
        return 'green'
      case 'strong':
        return 'yellowgreen'
      case 'medium':
        return 'orange'
      case 'weak':
        return 'red'
      default:
        return 'gray'
    }
  }

  public async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    const { email, name, password } = this.form.value

    const translationKeys = {
      successTitle: 'auth.main.sign-up.form.toasts.success.title',
      successDescription: 'auth.main.sign-up.form.toasts.success.description',
      failedTitle: 'auth.main.sign-up.form.toasts.failed.title',
      failedDescription: 'auth.main.sign-up.form.toasts.failed.description',
    }

    const translations = await this._translationService.getTranslations([
      translationKeys.successTitle,
      translationKeys.successDescription,
      translationKeys.failedTitle,
      translationKeys.failedDescription,
    ])

    try {
      await this.load(async () => {
        const params: SignUpParams = { email, name, password }
        await this._signUpService.execute(params)

        toast.success(translations[translationKeys.successTitle], {
          description: translations[translationKeys.successDescription],
        })
      })
      this._router.navigate(['/auth/sign-in'])
    } catch (error: any) {
      console.error(error)

      toast.error(translations[translationKeys.failedTitle], {
        description:
          error.error.title ?? translations[translationKeys.failedDescription],
      })
    }
  }
}
