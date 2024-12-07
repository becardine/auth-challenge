import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core'
import { provideRouter } from '@angular/router'

import { authInterceptor, provideAuth } from '@/modules'
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { routes } from './app.routes'
import { TranslationService } from './common/translation/translation.service'

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

export function initializeApp(translationService: TranslationService) {
  return () => translationService.init()
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [TranslationService],
      multi: true,
    },
    provideRouter(routes),
    provideAuth(),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
}
