import { DOCUMENT, isPlatformBrowser } from '@angular/common'
import {
  Injectable,
  PLATFORM_ID,
  RendererFactory2,
  effect,
  inject,
  signal,
} from '@angular/core'
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _platformId = inject(PLATFORM_ID)
  private _renderer = inject(RendererFactory2).createRenderer(null, null)
  private _document = inject(DOCUMENT)
  public theme = signal<'light' | 'dark'>('light')
  constructor() {
    this._syncThemeFromLocalStorage()
    this._toggleClassOnThemeChanges()
  }
  private _syncThemeFromLocalStorage(): void {
    if (isPlatformBrowser(this._platformId)) {
      this.theme.set(
        localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
      )
    }
  }
  private _toggleClassOnThemeChanges(): void {
    effect(() => {
      if (this.theme() === 'dark') {
        this._renderer.addClass(this._document.documentElement, 'dark')
      } else {
        if (this._document.documentElement.className.includes('dark')) {
          this._renderer.removeClass(this._document.documentElement, 'dark')
        }
      }
    })
  }
  public toggleDarkMode(): void {
    const newTheme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', newTheme)
    this.theme.set(newTheme)
  }
}
