import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export abstract class Unsub implements OnDestroy {
  protected unSub$ = new Subject<void>()

  ngOnDestroy(): void {
    this.unSub$.next()
    this.unSub$.complete()
  }
  
}