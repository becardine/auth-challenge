import { coerceBooleanProperty, type BooleanInput } from '@angular/cdk/coercion'
import { Directive, Input, computed, input, signal } from '@angular/core'
import { cva, type VariantProps } from 'class-variance-authority'
import cn from 'classnames'
import { clsx, type ClassValue } from 'clsx'

export const labelVariants = cva(
  'text-sm opacity-60 transition-all duration-200 ease-in-out mb-2 font-medium leading-none [&>[app-input]]:my-1 [&>[app-input]]:w-full [&:has([app-input]:disabled)]:cursor-not-allowed [&:has([app-input]:disabled)]:opacity-70',
  {
    variants: {
      variant: {
        default: '',
      },
      error: {
        auto: '[&:has([app-input].ng-invalid.ng-touched)]:text-destructive',
        true: 'text-destructive opacity-100',
      },
      disabled: {
        auto: '[&:has([app-input]:disabled)]:opacity-70',
        true: 'opacity-70',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      error: 'auto',
    },
  },
)
type LabelVariants = VariantProps<typeof labelVariants>

@Directive({
  selector: '[appLabel]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class LabelDirective {
  public readonly userClass = input<ClassValue>('')

  protected _computedClass = computed(() =>
    cn(
      labelVariants({
        error: this._error(),
        disabled: this._disabled(),
        variant: this._variant(),
      }),
      clsx(this.userClass),
    ),
  )

  private readonly _disabled = signal<LabelVariants['disabled']>('auto')
  @Input()
  set disabled(value: LabelVariants['disabled'] | BooleanInput) {
    if (value === 'auto') {
      this._disabled.set(value)
      return
    }

    this._disabled.set(coerceBooleanProperty(value) ? true : 'auto')
  }

  private readonly _variant = signal<LabelVariants['variant']>('default')
  @Input()
  set variant(value: LabelVariants['variant']) {
    this._variant.set(value)
  }

  private readonly _error = signal<LabelVariants['error']>('auto')
  @Input()
  public set error(value: LabelVariants['error'] | BooleanInput) {
    if (value === 'auto') {
      this._error.set(value)
      return
    }

    this._error.set(coerceBooleanProperty(value) ? true : 'auto')
  }
}
