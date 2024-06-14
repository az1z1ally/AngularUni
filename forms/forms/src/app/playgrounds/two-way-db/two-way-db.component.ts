import { Component } from '@angular/core';
import { LayoutComponent } from '../../shared/components/layout/layout.component';
import { CounterComponent } from '../counter/counter.component';

@Component({
  selector: 'app-two-way-db',
  standalone: true,
  imports: [LayoutComponent, CounterComponent],
  template: `
    <app-layout>
      <ng-container>
        <img src="angular-logo-sm.png" alt="Angular Logo">
        <h2 class="header">Two way data binding</h2>
        <app-counter [(startFrom)]="counterValue"></app-counter>
        <div class="counter__value">
          Counter value: <b>{{ counterValue }}</b>
        </div>
      </ng-container>
    </app-layout>
  `,
  styles: `
    img {
      width: 100px;
    }
    .counter__value {
      letter-spacing: 1px;
      font-size: 1rem;
      font-weight:600;
    }
  `
})
export class TwoWayDbComponent {
  counterValue = 5

  constructor() {
    setTimeout(() => this.counterValue = 0, 5000)
  }

}
