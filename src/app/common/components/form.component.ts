import { Directive, inject } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  type AbstractControlOptions,
  type FormRecord,
} from '@angular/forms'
import { ComponentBase } from './base.component'

@Directive()
export abstract class FormComponent extends ComponentBase {
  public form: FormRecord

  protected readonly _formBuilder = inject(FormBuilder)

  constructor(
    controls: Record<string, unknown>,
    options?: AbstractControlOptions,
  ) {
    super()

    this.form = this._formBuilder.record(controls, options)
  }

  public override async load<T>(
    fn: (() => Promise<T>) | Promise<T>,
  ): Promise<T> {
    const controls = Object.values(this.form.controls).reduce<
      AbstractControl[]
    >((controls, control) => {
      if (control.enabled) {
        controls.push(control)
        control.disable()
      }

      return controls
    }, [])

    return super
      .load(fn)
      .then((result) => {
        this.form.reset()
        return result
      })
      .finally(() => {
        for (const control of controls) {
          control.enable()
        }
      })
  }
}
