import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, EventEmitter, Inject, Output } from '@angular/core';
import { filter, fromEvent, takeUntil } from 'rxjs';
import { Unsub } from '../classes/unsub.class';

@Directive({
  selector: '[clickOutside]',
  standalone: true
})
export class ClickOutsideDirective extends Unsub implements AfterViewInit {

  @Output('clickOutside') outside = new EventEmitter<void>()

  constructor(
    private element: ElementRef, 
    @Inject(DOCUMENT) private document: Document
  ) {
    super();
  }

  ngAfterViewInit(): void {
    fromEvent(this.document, 'click').pipe(
      filter((event) => {
        return !this.isInside(event.target as HTMLElement)
      }),
      takeUntil(this.unSub$)
    ).subscribe(() => {
      this.outside.emit()
    })

    fromEvent(this.document, 'scroll').pipe(
      takeUntil(this.unSub$)
    ).subscribe(() => (this.outside.emit()))
  }

  isInside(elementToCheck: HTMLElement): boolean {
    return (
      elementToCheck === this.element.nativeElement || 
      this.element.nativeElement.contains(elementToCheck)
    )
  }

}



// Other way
// import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

// @Directive({
//   selector: '[clickOutside]'
// })
// export class ClickOutsideDirective {
//   @Output('clickOutside') outside = new EventEmitter<void>();

//   constructor(private element: ElementRef) {}

//   @HostListener('document:click', ['$event'])
//   onDocumentClick(event: MouseEvent): void {
//     if (!this.element.nativeElement.contains(event.target)) {
//       this.outside.emit();
//     }
//   }
// }
