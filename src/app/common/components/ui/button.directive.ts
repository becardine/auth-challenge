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

export const buttonVariants = cva(
  'inline-flex rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline !mx-0 !mh-0 !p-0',
        transparent: 'hover:bg-primary/10',
        icon: 'bg-transparent text-accent-foreground',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        md: 'h-10 px-4 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)
export type ButtonVariants = VariantProps<typeof buttonVariants>

@Directive({
  selector: 'button[appButton],a[appButton]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class ButtonDirective {
  public readonly userClass = input<ClassValue>('items-center justify-center')

  protected _computedClass = computed(() => {
    return cn(
      buttonVariants({ variant: this._variant(), size: this._size() }),
      clsx(this.userClass()),
    )
  })

  private readonly _variant = signal<ButtonVariants['variant']>('default')
  @Input()
  set variant(variant: ButtonVariants['variant']) {
    this._variant.set(variant)
  }

  private readonly _size = signal<ButtonVariants['size']>('default')
  @Input()
  set size(size: ButtonVariants['size']) {
    this._size.set(size)
  }
}

export const buttonGroupVariants = cva('', {
  variants: {
    type: {
      default: 'btn-group',
      toolbar: 'btn-toolbar',
    },
  },
  defaultVariants: {
    type: 'default',
  },
})

export type ButtonGroupVariants = VariantProps<typeof buttonGroupVariants>

@Component({
  selector: 'app-button-group',
  standalone: true,
  template: '<ng-content></ng-content>',
  host: {
    role: 'group',
    '[class]': '_computedClass()',
  },
})
export class ButtonGroupComponent {
  public readonly userClass = input<ClassValue>('')

  protected _computedClass = computed(() =>
    cn(buttonGroupVariants({ type: this._type() }), clsx(this.userClass)),
  )

  private readonly _type = signal<ButtonGroupVariants['type']>('default')
  @Input()
  set type(type: ButtonGroupVariants['type']) {
    this._type.set(type)
  }
}
