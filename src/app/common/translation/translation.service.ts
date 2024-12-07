import { isPlatformBrowser } from '@angular/common'
import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { firstValueFrom } from 'rxjs'
import { languages } from './languages'

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  defaultLang = languages[0] || 'en'
  browserLang: string | undefined

  translate: TranslateService = inject(TranslateService)

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  init() {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('@auth_challenge/lng')

      this.browserLang = this.translate.getBrowserLang()

      if (savedLang) {
        this.defaultLang = savedLang
      } else if (this.browserLang) {
        this.defaultLang = this.browserLang
      }

      this.translate.setDefaultLang(this.defaultLang)
      this.translate.use(this.defaultLang)
    }
  }

  changeLang(lang: string) {
    this.translate.use(lang)
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('@auth_challenge/lng', lang)
    }
  }

  public get currentLang() {
    return this.translate.currentLang
  }

  public get(key: string | string[]) {
    return this.translate.get(key)
  }

  public getTranslations(keys: string[]): Promise<Record<string, string>> {
    return firstValueFrom(this.translate.get(keys))
  }
}
