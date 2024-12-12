import { makeEnvironmentProviders } from '@angular/core'
import {
  AuthService,
  ConfirmEmailService,
  PasswordStrengthService,
  SignInService,
  SignUpService,
} from '../core'

export function provideAuth() {
  return makeEnvironmentProviders([
    {
      provide: AuthService,
      useClass: AuthService,
    },
    {
      provide: SignUpService,
      useClass: SignUpService,
    },
    {
      provide: SignInService,
      useClass: SignInService,
    },
    {
      provide: PasswordStrengthService,
      useClass: PasswordStrengthService,
    },
    {
      provide: ConfirmEmailService,
      useClass: ConfirmEmailService,
    },
  ])
}
