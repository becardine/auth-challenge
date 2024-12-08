import { Component } from '@angular/core'

@Component({
  selector: 'app-dashboard-wrapper',
  standalone: true,
  imports: [],
  template: `
    <div class="grid md:grid-cols min-h-screen overflow-hidden">
      <ng-content select="[sidebar]" />
      <main class="overflow-hidden">
        <ng-content />
      </main>
    </div>
  `,
  styles: [``],
})
export class DashboardWrapperComponent {}
