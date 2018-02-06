import { Directive, HostBinding, Input, ElementRef, HostListener } from '@angular/core';
import { TreeInternalComponent } from './tree-internal.component';

@Directive({
  selector: '[appTreeNode]',
  host: {
    '[class.tree-node]': 'true',
    '[class.tree-node-icon]': 'true'
  }
})
export class TreeNodeDirective {
  private _expand;
  private _data;
  @Input()
  @HostBinding(`class.tree-node-expand`)
  set expand(value: boolean) {
    this._expand = value;
  }

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
    this.expand = !this.expand;
    // this._tree.isexpanded = this.expand;
    // console.log(this.data);
  }

  get expand(): boolean {
    return this._expand;
  }

  constructor(
    private _tree: TreeInternalComponent,
    private _elementRef: ElementRef
  ) {
    // console.log(this.expand);
  }

}
