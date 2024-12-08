import { NgClass } from '@angular/common'
import { Component, computed, input } from '@angular/core'
import { RouterLink } from '@angular/router'
import cn from 'classnames'
import { ButtonVariants, UIModule } from '../components'

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [],
  template: ` <aside
    class="hidden max-w-full md:grid grid-cols-[auto_1fr] gap-4"
  >
    <ng-content />
  </aside>`,
  styles: [``],
})
export class DashboardSidebarComponent {}

@Component({
  selector: 'app-dashboard-sidebar-toolbar',
  standalone: true,
  imports: [],
  template: `
    <div
      class="h-screen w-20 relative bg-secondary/20 z-10 border-r page-transition border-border flex flex-col items-center py-4 animate-fade-up animate-delay-75 animate-once animate-ease-in-out"
    >
      <ng-content />
    </div>
  `,
  styles: [``],
})
export class DashboardSidebarToolbarComponent {}

@Component({
  selector: 'app-dashboard-sidebar-toolbar-header',
  standalone: true,
  imports: [],
  template: `
    <div class="flex flex-col justify-center h-10 mb-9">
      <ng-content />
    </div>
  `,
  styles: [``],
})
export class DashboardSidebarToolbarHeaderComponent {}

@Component({
  selector: 'app-dashboard-sidebar-menu',
  standalone: true,
  imports: [NgClass],
  template: `
    <div
      class="h-screen w-64 border-r z-0 page-transition border-border py-4 pr-4 flex flex-col animate-fade-up animate-delay-150 animate-once animate-ease-in-out"
      [ngClass]="className()"
    >
      <ng-content />
    </div>
  `,
  styles: [``],
})
export class DashboardSidebarMenuComponent {
  public readonly className = input<string>('')
}

@Component({
  selector: 'app-dashboard-sidebar-toolbar-menu',
  standalone: true,
  imports: [],
  template: `
    <div class="flex flex-col items-center space-y-2 flex-1">
      <ng-content />
    </div>
  `,
  styles: [``],
})
export class DashboardSidebarToolbarMenuComponent {}

@Component({
  selector: 'app-dashboard-sidebar-toolbar-menu-item',
  standalone: true,
  imports: [NgClass, UIModule, RouterLink],
  template: `
    <button
      appButton
      [variant]="variant()"
      size="icon"
      [ngClass]="{ 'bg-secondary': isActive(), '!p-0': src() }"
      [routerLink]="link()"
    >
      @if (src()) {
        <img
          [src]="src()"
          alt="Logo"
          class="rounded-md w-full h-full"
          [width]="32"
          [height]="32"
        />
      } @else {
        <ng-content />
      }
    </button>
  `,
  styles: [``],
})
export class DashboardSidebarToolbarMenuItemComponent {
  public readonly src = input<string>('')
  public readonly isActive = input<boolean>(false)
  public readonly variant = input<ButtonVariants['variant']>()
  public readonly link = input<string>('')
}

@Component({
  selector: 'app-dashboard-sidebar-toolbar-actions',
  standalone: true,
  imports: [],
  template: `
    <aside class="flex flex-col items-center space-y-2">
      <ng-content />
    </aside>
  `,
  styles: [``],
})
export class DashboardSidebarToolbarActionsComponent {}

@Component({
  selector: 'app-dashboard-sidebar-toolbar-actions-item',
  standalone: true,
  imports: [],
  template: `
    <button class="btn btn-ghost">
      <ng-content />
    </button>
  `,
  styles: [``],
})
export class DashboardSidebarToolbarActionsItemComponent {}

@Component({
  selector: 'app-dashboard-sidebar-header',
  standalone: true,
  imports: [],
  template: `
    <header class="px-4 mb-9 flex items-center justify-between h-10">
      <ng-content />
    </header>
  `,
  styles: [``],
})
export class DashboardSidebarHeaderComponent {}

@Component({
  selector: 'app-dashboard-sidebar-title',
  standalone: true,
  imports: [],
  template: `
    <strong class="text-md">
      <ng-content />
    </strong>
  `,
  styles: [``],
})
export class DashboardSidebarTitleComponent {}

@Component({
  selector: 'app-dashboard-sidebar-main',
  standalone: true,
  imports: [NgClass],
  template: `
    <main class="mb-5 flex-1" [ngClass]="className()">
      <ng-content />
    </main>
  `,
  styles: [``],
})
export class DashboardSidebarMainComponent {
  public readonly className = input<string>('')
}

@Component({
  selector: 'app-dashboard-sidebar-link',
  standalone: true,
  imports: [NgClass, UIModule, RouterLink],
  template: `
    <button
      appButton
      variant="transparent"
      size="icon"
      class="w-full items-center justify-start mb-2 px-5 gap-2"
      [ngClass]="_computedActiveClass()"
      [routerLink]="link()"
    >
      <ng-content />
    </button>
  `,
  styles: [``],
})
export class DashboardSidebarLinkComponent {
  public readonly isActive = input<boolean>(false)
  public readonly className = input<string>('')
  public readonly icon = input<string>('')
  public readonly link = input<string>('')

  protected _computedActiveClass = computed(() =>
    cn('text-primary', this.isActive() && 'bg-secondary'),
  )
}

@Component({
  selector: 'app-dashboard-sidebar-footer',
  standalone: true,
  imports: [],
  template: `
    <footer>
      <section>
        <ng-content />
      </section>
    </footer>
  `,
  styles: [``],
})
export class DashboardSidebarFooterComponent {}
