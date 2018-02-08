import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import * as EventUtils from './event.utils';
import { Tree } from './tree';
import { TreeInternalComponent } from './tree-internal.component';

@Directive({
  selector: '[appTreeNodeValue]',
  host: {
    '[class.tree-node-value]': 'true'
  }
})
export class TreeNodeValueDirective {
  private tree: Tree;

  @HostListener('click', ['$event'])
  onClick(event: { button: number, stopPropagation: Function }): void {
    event.stopPropagation();
    if (EventUtils.isLeftButtonClicked(event as MouseEvent)) {
      console.log(this.tree.node.ptext);
    }
  }

  constructor(
    public component: TreeInternalComponent,
    public _elementRef: ElementRef
  ) {
    this.tree = this.component.tree;
  }

}
