import { coerceBooleanProperty, type BooleanInput } from '@angular/cdk/coercion'
import {
  Component,
  Directive,
  Input,
  computed,
  input,
  signal,
} from '@angular/core'
import { cva, type VariantProps } from 'class-variance-authority'
import cn from 'classnames'
import { clsx, type ClassValue } from 'clsx'

export const inputVariants = cva(
  'flex w-full rounded-md font-normal bg-transparent text-sm file:border-0 file:text-foreground file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3',
        lg: 'h-11 px-4',
        xl: 'h-12 px-4',
      },
      error: {
        auto: '[&.ng-invalid.ng-touched]:text-destructive [&.ng-invalid.ng-touched]:border-destructive [&.ng-invalid.ng-touched]:focus-visible:ring-destructive',
        true: 'text-destructive border-destructive focus-visible:ring-destructive',
      },
    },
    defaultVariants: {
      size: 'default',
      error: 'auto',
    },
  },
)
type InputVariants = VariantProps<typeof inputVariants>

@Directive({
  selector: '[appInput]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class InputDirective {
  public readonly userClass = input<ClassValue>('')

  protected _computedClass = computed(() =>
    cn(
      inputVariants({ error: this._error(), size: this._size() }),
      clsx(this.userClass),
    ),
  )

  private readonly _error = signal<InputVariants['error']>('auto')
  @Input()
  public set error(value: InputVariants['error'] | BooleanInput) {
    if (value === 'auto') {
      this._error.set(value)
      return
    }

    this._error.set(coerceBooleanProperty(value) ? true : 'auto')
  }

  private readonly _size = signal<InputVariants['size']>('default')
  @Input()
  set size(size: InputVariants['size']) {
    this._size.set(size)
  }
}

export const inputErrorVariants = cva('text-destructive text-sm font-medium', {
  variants: {},
  defaultVariants: {},
})
export type InputErrorVariants = VariantProps<typeof inputErrorVariants>

@Directive({
  selector: '[app-input][error]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class InputErrorDirective {
  public readonly userClass = input<string, ClassValue>('', {
    transform: clsx,
  })
  protected _computedClass = computed(() =>
    cn(inputErrorVariants(), this.userClass()),
  )
}

export const inputGroupVariants = cva('input-group')

@Component({
  selector: 'app-input-group',
  standalone: true,
  template: '<ng-content></ng-content>',
  host: {
    role: 'group',
    '[class]': '_computedClass()',
  },
})
export class InputGroupComponent {
  public readonly userClass = input<ClassValue>('')

  protected _computedClass = computed(() =>
    cn(inputGroupVariants(), clsx(this.userClass)),
  )
}
