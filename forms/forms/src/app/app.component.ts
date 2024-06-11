import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemplateFormsComponent } from './playgrounds/template-forms/template-forms.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'forms';
}
