import { NgClass, NgStyle } from '@angular/common'
import { Component, computed, input } from '@angular/core'
import cn from 'classnames'
import clsx, { type ClassValue } from 'clsx'

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass, NgStyle],
  template: `<div [ngClass]="_computedClass()">
    <ng-content />
  </div>`,
})
export class CardComponent {
  public readonly userClass = input<ClassValue>('')
  public readonly testId = input<string | null>(null)

  protected _computedClass = computed(() =>
    cn(
      'rounded-md border bg-card text-card-foreground shadow-sm animate-fade-up animate-delay-75 animate-once',
      clsx(this.userClass),
    ),
  )
}

@Component({
  selector: 'app-card-header',
  standalone: true,
  imports: [NgClass],
  template: `<ng-content />`,
  host: {
    '[class]': '_computedClass()',
  },
})
export class CardHeaderComponent {
  public readonly userClass = input<ClassValue>('')

  protected _computedClass = computed(() =>
    cn(
      'flex space-y-1.5 p-6 animate-fade-up animate-delay-200 animate-once animate-ease-in-out',
      clsx(this.userClass),
    ),
  )
}

@Component({
  selector: 'app-card-tittle',
  standalone: true,
  imports: [NgClass],
  template: `<h3 [ngClass]="_computedClass()"><ng-content /></h3>`,
})
export class CardTittleComponent {
  public readonly userClass = input<ClassValue>('')

  protected _computedClass = computed(() =>
    cn('text-md font-semibold', clsx(this.userClass)),
  )
}

@Component({
  selector: 'app-card-description',
  standalone: true,
  imports: [NgClass],
  template: `<p [ngClass]="_computedClass()"><ng-content /></p>`,
})
export class CardDescriptionComponent {
  public readonly userClass = input<ClassValue>('')

  protected _computedClass = computed(() =>
    cn('text-sm text-muted-foreground', clsx(this.userClass)),
  )
}

@Component({
  selector: 'app-card-content',
  standalone: true,
  imports: [NgClass],
  template: ` <ng-content />`,
  host: {
    '[class]': '_computedClass()',
  },
})
export class CardContentComponent {
  public readonly userClass = input<ClassValue>('')

  protected _computedClass = computed(() => {
    return cn(
      'p-6 animate-fade-up animate-delay-300 animate-once animate-ease-in-out',
      clsx(this.userClass),
    )
  })
}

@Component({
  selector: 'app-card-footer',
  standalone: true,
  imports: [NgClass],
  template: `<div [ngClass]="_computedClass()"><ng-content /></div>`,
})
export class CardFooterComponent {
  public readonly userClass = input<ClassValue>('')

  protected _computedClass = computed(() =>
    cn('flex items-center p-6 pt-0', clsx(this.userClass)),
  )
}

@Component({
  selector: 'app-card-icon',
  standalone: true,
  imports: [NgClass],
  template: `<div [ngClass]="_computedClass()"><ng-content /></div>`,
})
export class CardIconComponent {
  public readonly userClass = input<ClassValue>('')

  protected _computedClass = computed(() => cn(clsx(this.userClass)))
}
