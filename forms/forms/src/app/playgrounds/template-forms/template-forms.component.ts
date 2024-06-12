import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserInfo } from '../../core/user-info';

@Component({
  selector: 'app-template-forms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './template-forms.component.html',
  styleUrl: './template-forms.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateFormsComponent implements OnInit{
  userInfo: UserInfo

  constructor() {
    this.userInfo = {
      firstName: 'JS',
      lastName: '',
      nickName: '',
      email: '',
      yearOfBirth: this.years[0],
      passport: '',
      fullAddress: '',
      city: '',
      postCode: 0
    }
  }

  ngOnInit(): void {

  }

  get years() {
    const now = new Date().getUTCFullYear()
    return Array(now - (now - 40)).fill('').map((_, idx) => now - idx)
  }

  onSubmitForm(form: NgForm, event: SubmitEvent): void {
    console.log('The form has been submitted.', form.value); // same as form.form.value
    // console.log(event);

    form.resetForm()
  }

}
