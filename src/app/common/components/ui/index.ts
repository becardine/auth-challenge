import { NgModule } from '@angular/core'
import { ToasterComponent } from './toaster.component'

export const UIImports = [ToasterComponent] as const

@NgModule({
  imports: [...UIImports],
  exports: [...UIImports],
  providers: [],
})
export class UIModule {}
