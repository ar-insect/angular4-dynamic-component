import { Directive, Input, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[app-layout]'
})
export class AppLayoutDirective {
  // @Input() viewContainer: string;
  constructor(
    public elementRef: ElementRef
  ) {
  }

}
