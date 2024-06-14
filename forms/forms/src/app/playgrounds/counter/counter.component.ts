import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  template: `
    <div class="counter">
      {{ startFrom }}
    </div>
  `,
  styles: `
    .counter {
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--secondary-color);
      box-shadow: var(--box-shadow);
      backdrop-filter: blur(30px);
      border-radius: 8px;
      padding:1.75rem 5rem;
      font-size: 2.25rem;
      font-weight: bold;
    }
  `
})
export class CounterComponent implements OnInit{
  @Input()
  startFrom = 0

  @Output()
  startFromChange = new EventEmitter()

  ngOnInit(): void {
    setInterval(() => {
      this.startFrom++
      this.startFromChange.emit(this.startFrom)
    }, 1000)
  }
}
