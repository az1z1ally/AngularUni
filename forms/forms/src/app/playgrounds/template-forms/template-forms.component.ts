import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
      firstName: 'Working',
      lastName: '',
      nickName: '',
      email: '',
      yearOfBirth: 0,
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

}
