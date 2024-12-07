import { Component, Input, computed, input, signal } from '@angular/core'
import { cva, type VariantProps } from 'class-variance-authority'
import cn from 'classnames'
import clsx, { type ClassValue } from 'clsx'

export const spinnerVariants = cva('', {
  variants: {
    variant: {
      default: 'spinner-border',
      grow: 'spinner-grow',
    },
    size: {
      sm: 'spinner-border-sm',
      md: '',
      lg: 'spinner-border-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})
type SpinnerVariants = VariantProps<typeof spinnerVariants>

@Component({
  selector: 'app-spinner',
  template: '<span class="sr-only">Loading...</span>',
  standalone: true,
  host: {
    role: 'status',
    '[class]': '_computedClass()',
  },
})
export class SpinnerComponent {
  public readonly userClass = input<ClassValue>('')

  protected _computedClass = computed(() =>
    cn(
      spinnerVariants({ variant: this._variant(), size: this._size() }),
      clsx(this.userClass),
    ),
  )

  private readonly _variant = signal<SpinnerVariants['variant']>('default')
  @Input()
  set variant(value: SpinnerVariants['variant']) {
    this._variant.set(value)
  }

  private readonly _size = signal<SpinnerVariants['size']>('md')
  @Input()
  set size(value: SpinnerVariants['variant']) {
    this._variant.set(value)
  }
}
