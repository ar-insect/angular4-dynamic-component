import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import * as EventUtils from './event.utils';
import { Tree } from './tree';

@Directive({
  selector: '[appTreeNodeValue]',
  host: {
    '[class.tree-node-value]': 'true'
  }
})
export class TreeNodeValueDirective {
  @Input()
  public tree: Tree;

  @HostListener('click', ['$event'])
  onClick(event: { button: number }): void {
    // event.stopPropagation();
    if (EventUtils.isLeftButtonClicked(event as MouseEvent)) {
      console.log(this.tree.node.ptext);
    }
  }
  constructor(public _elementRef: ElementRef) { }

}
