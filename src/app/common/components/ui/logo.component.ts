import { APP_CONFIG } from '@/app/config'
import { NgClass } from '@angular/common'
import { Component, input } from '@angular/core'

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [NgClass],
  template: `
    @if (onlyIcon()) {
      <img
        [src]="darkIcon"
        [alt]="appName"
        [ngClass]="className() + ' h-12 dark:hidden'"
      />
      <img
        [src]="lightIcon"
        [alt]="appName"
        [ngClass]="className() + ' h-12 hidden dark:block'"
      />
    } @else {
      <img
        [src]="darkFull"
        [alt]="appName"
        [ngClass]="className() + ' h-12 dark:hidden'"
      />
      <img
        [src]="lightFull"
        [alt]="appName"
        [ngClass]="className() + ' h-12 hidden dark:block'"
      />
    }
  `,
  styles: ``,
})
export class LogoComponent {
  public readonly className = input<string>('')
  public readonly onlyIcon = input<boolean>(false)

  public darkIcon = APP_CONFIG.app.brand.logos.icon.dark
  public lightIcon = APP_CONFIG.app.brand.logos.icon.light
  public darkFull = APP_CONFIG.app.brand.logos.full.dark
  public lightFull = APP_CONFIG.app.brand.logos.full.light
  public appName = APP_CONFIG.app.name
}
