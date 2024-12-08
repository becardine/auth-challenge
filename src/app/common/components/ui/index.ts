import { NgModule } from '@angular/core'
import { ButtonDirective, ButtonGroupComponent } from './button.directive'
import { cardComponents } from './card'
import { IconComponent } from './icon.component'
import { icons } from './icons'
import { InputDirective } from './input.directive'
import { LabelDirective } from './label.directive'
import { LogoComponent } from './logo.component'
import { SeparatorWithTextComponent } from './separator-with-text.component'
import { SpinnerComponent } from './spinner.component'
import { ToasterComponent } from './toaster.component'

export * from './button.directive'

export const UIImports = [
  IconComponent,
  ToasterComponent,
  ButtonDirective,
  InputDirective,
  LabelDirective,
  SpinnerComponent,
  SeparatorWithTextComponent,
  LogoComponent,
  ButtonGroupComponent,
  ...cardComponents,
  ...icons,
] as const

@NgModule({
  imports: [...UIImports],
  exports: [...UIImports],
  providers: [],
})
export class UIModule {}
