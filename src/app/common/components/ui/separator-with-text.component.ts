import { NgClass } from '@angular/common'
import { Component, input } from '@angular/core'

@Component({
  selector: 'app-separator-with-text',
  standalone: true,
  imports: [NgClass],
  template: `
    <div
      class="w-full flex space-x-1 items-center justify-center mt-4"
      [ngClass]="className()"
    >
      <hr class="w-1/3" />
      <div class="w-1/3 text-center text-xs uppercase text-zinc-600">
        <ng-content></ng-content>
      </div>
      <hr class="w-1/3" />
    </div>
  `,
  styles: ``,
})
export class SeparatorWithTextComponent {
  public readonly className = input<string>('')
}
