import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  input,
  numberAttribute,
} from '@angular/core'
import { NgxSonnerToaster, type ToasterProps } from 'ngx-sonner'

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [NgxSonnerToaster],
  template: `
    <ngx-sonner-toaster
      class="toaster group"
      [dir]="dir()"
      [offset]="offset()"
      [invert]="invert()"
      [theme]="theme()"
      [hotKey]="hotKey()"
      [expand]="expand()"
      [position]="position()"
      [duration]="duration()"
      [richColors]="richColors()"
      [closeButton]="closeButton()"
      [visibleToasts]="visibleToasts()"
      [toastOptions]="toastOptions()"
      [class]="_class()"
      [style]="_style()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToasterComponent {
  public readonly dir = input<ToasterProps['dir']>('auto')
  public readonly theme = input<ToasterProps['theme']>('light')
  public readonly offset = input<ToasterProps['offset']>(null)
  public readonly hotKey = input<ToasterProps['hotkey']>(['altKey', 'KeyT'])
  public readonly position = input<ToasterProps['position']>('bottom-right')
  public readonly invert = input<ToasterProps['invert'], boolean | string>(
    false,
    {
      transform: booleanAttribute,
    },
  )
  public readonly richColors = input<
    ToasterProps['richColors'],
    boolean | string
  >(false, {
    transform: booleanAttribute,
  })
  public readonly expand = input<ToasterProps['expand'], boolean | string>(
    false,
    {
      transform: booleanAttribute,
    },
  )
  public readonly duration = input<ToasterProps['duration'], number | string>(
    4000,
    {
      transform: numberAttribute,
    },
  )
  public readonly visibleToasts = input<
    ToasterProps['visibleToasts'],
    number | string
  >(3, {
    transform: numberAttribute,
  })
  public readonly closeButton = input<
    ToasterProps['closeButton'],
    boolean | string
  >(false, {
    transform: booleanAttribute,
  })
  public readonly toastOptions = input<ToasterProps['toastOptions']>({
    classes: {
      toast:
        'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
      description: 'group-[.toast]:text-muted-foreground',
      actionButton:
        'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
      cancelButton:
        'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
    },
  })

  protected readonly _class = input('')
  protected readonly _style = input<Record<string, string>>({})
}
