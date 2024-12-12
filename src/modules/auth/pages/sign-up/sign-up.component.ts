import { ComponentBase, UIModule } from '@/app/common/components'
import { Component, signal } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { RegisterFormComponent } from '../../components/register-form/register-form.component'

@Component({
  selector: 'app-sign-up',
  styleUrls: ['./sign-up.component.scss'],
  templateUrl: './sign-up.component.html',
  standalone: true,
  imports: [RouterModule, UIModule, TranslateModule, RegisterFormComponent],
})
export class SignUpComponent extends ComponentBase {
  public getFullYear = signal<number>(new Date().getFullYear())
}
