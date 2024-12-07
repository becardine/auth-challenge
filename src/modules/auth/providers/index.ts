import { makeEnvironmentProviders } from '@angular/core'
import { AuthService } from '../core'

export function provideAuth() {
  return makeEnvironmentProviders([
    {
      provide: AuthService,
      useClass: AuthService,
    },
  ])
}
