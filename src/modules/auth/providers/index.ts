import { makeEnvironmentProviders } from '@angular/core'
import {
  AuthService,
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
  ])
}
