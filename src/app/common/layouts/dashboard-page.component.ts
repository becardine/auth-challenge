import { NgClass } from '@angular/common'
import { Component, computed, input } from '@angular/core'
import cn from 'classnames'

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [NgClass],
  template: `
    <div
      class="md:h-screen flex flex-col animate-fade-up animate-delay-300 animate-once animate-ease-in-out"
      [ngClass]="className()"
    >
      <ng-content />
    </div>
  `,
  styles: ``,
})
export class DashboardPageComponent {
  public readonly className = input<string>('')
}

@Component({
  selector: 'app-dashboard-page-header',
  standalone: true,
  imports: [NgClass],
  template: `
    <header [ngClass]="_computedClass()">
      <ng-content />
    </header>
  `,
})
export class DashboardPageHeaderComponent {
  public readonly className = input<string>('')

  protected _computedClass = computed(() =>
    cn(
      'border-b border-border min-h-[69px] flex items-center justify-between px-8',
      this.className(),
    ),
  )
}

@Component({
  selector: 'app-dashboard-page-header-title',
  standalone: true,
  imports: [NgClass],
  template: `
    <h1 class="opacity-60 text-md md:text-sm" [ngClass]="className()">
      <ng-content />
    </h1>
  `,
  styles: ``,
})
export class DashboardPageHeaderTitleComponent {
  public readonly className = input<string>('')
}

@Component({
  selector: 'app-dashboard-page-header-actions',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="flex items-center !space-x-4" [ngClass]="className()">
      <ng-content />
    </div>
  `,
  styles: ``,
})
export class DashboardPageHeaderActionsComponent {
  public readonly className = input<string>('')
}

@Component({
  selector: 'app-dashboard-page-main',
  standalone: true,
  imports: [NgClass],
  template: `
    <main
      class="p-8 pt-6 h-[calc(100vh_-_69px)] overflow-y-auto pb-32 md:pb-8"
      [ngClass]="className()"
    >
      <ng-content />
    </main>
  `,
  styles: ``,
})
export class DashboardPageMainComponent {
  public readonly className = input<string>('')
}
