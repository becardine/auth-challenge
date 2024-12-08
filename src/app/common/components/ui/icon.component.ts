import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  computed,
  signal,
} from '@angular/core'
import { VariantProps, cva } from 'class-variance-authority'
import cn from 'classnames'
import clsx, { ClassValue } from 'clsx'

const DEFINED_SIZES = ['xs', 'sm', 'base', 'lg', 'xl', 'none'] as const

type DefinedSizes = (typeof DEFINED_SIZES)[number]

export const iconVariants = cva(
  'notranslate material-symbols-outlined inline-flex items-center justify-center',
  {
    variants: {
      variant: {
        xs: 'size-3 text-xs',
        sm: 'size-4 text-sm',
        base: 'size-6',
        lg: 'size-8 text-xl',
        xl: 'size-12 text-2xl',
        none: '',
      } satisfies Record<DefinedSizes, string>,
    },
    defaultVariants: {
      variant: 'base',
    },
  },
)
export type IconVariants = VariantProps<typeof iconVariants>

export type IconSize = DefinedSizes | string

const isDefinedSize = (size: IconSize): size is DefinedSizes => {
  return DEFINED_SIZES.includes(size as DefinedSizes)
}

const TAILWIND_H_W_PATTERN = /\b(h-\d+|w-\d+)\b/g

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    {{ _name() }}
    <ng-content></ng-content>
  `,
  host: {
    '[class]': '_computedClass()',
    '[style.fontSize]': 'ngIconSize()',
  },
})
export class IconComponent {
  private readonly _hostClasses = signal<string>('')

  protected readonly _name = signal<string>('')
  protected readonly _size = signal<IconSize>('base')
  protected readonly _color = signal<string | undefined>(undefined)
  protected readonly _userClass = signal<ClassValue>('')
  protected readonly _ngIconClass = signal<ClassValue>('')

  protected readonly ngIconSize = computed(() =>
    isDefinedSize(this._size()) ? undefined : (this._size() as string),
  )

  protected readonly _computedClass = computed(() => {
    const size: IconSize = this._size()
    const hostClasses = this._hostClasses()
    const userClass = this._userClass()
    const variant = isDefinedSize(size) ? size : 'none'
    const classes =
      variant === 'none' && size === 'none'
        ? hostClasses
        : hostClasses.replace(TAILWIND_H_W_PATTERN, '')

    return cn(iconVariants({ variant }), clsx(userClass), classes)
  })

  @Input()
  set name(value: string) {
    this._name.set(value)
  }

  @Input()
  set size(value: IconSize) {
    this._size.set(value)
  }

  @Input()
  set color(value: string | undefined) {
    this._color.set(value)
  }

  @Input()
  set ngIconClass(cls: ClassValue) {
    this._ngIconClass.set(cls)
  }

  @Input()
  set class(cls: ClassValue) {
    this._userClass.set(cls)
  }
}
