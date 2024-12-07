import { NgModule } from '@angular/core'
import { ButtonDirective } from './button.directive'
import { cardComponents } from './card'
import { InputDirective } from './input.directive'
import { LabelDirective } from './label.directive'
import { SpinnerComponent } from './spinner.component'
import { ToasterComponent } from './toaster.component'

export const UIImports = [
  ToasterComponent,
  ButtonDirective,
  InputDirective,
  LabelDirective,
  SpinnerComponent,
  ...cardComponents,
] as const

@NgModule({
  imports: [...UIImports],
  exports: [...UIImports],
  providers: [],
})
export class UIModule {}
