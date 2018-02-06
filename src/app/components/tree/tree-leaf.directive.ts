import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTreeLeaf]',
  host: {
    '[class.tree-leaf]': 'true'
  }
})
export class TreeLeafDirective {
  private _data;

  @Input()
  set data(value: {[key: string]: number | string}) {
    this._data = value;
  }

  get data(): {[key: string]: number | string} {
    return this._data;
  }

  @HostListener('click', ['$event'])
  onClick($event: Event) {
    $event.stopPropagation();
    console.log(this.data);
  }
  constructor() { }

}
