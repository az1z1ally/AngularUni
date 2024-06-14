import { Routes } from '@angular/router';
import { TemplateFormsComponent } from './playgrounds/template-forms/template-forms.component';
import { TwoWayDbComponent } from './playgrounds/two-way-db/two-way-db.component';

export const routes: Routes = [
  {path: '', component: TemplateFormsComponent},
  {path: 'two-way-db', component: TwoWayDbComponent},
];
