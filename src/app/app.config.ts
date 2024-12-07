import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'

import { authInterceptor, provideAuth } from '@/modules'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAuth(),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
}
