import {
    Component,
    OnInit,
    ViewEncapsulation,
    Input,
    Output,
    EventEmitter,
    OnDestroy } from '@angular/core';
  import { Tree } from './tree';

  interface TreeConfig {
    id: number;
    ptext: string;
    children?: Array<TreeConfig>;
  }

  @Component({
    selector: 'app-tree-internal',
    encapsulation: ViewEncapsulation.None,
    template: `
        <ul class="tree" *ngIf="treeModel">
          <ng-container *ngIf="isNode(treeModel)">
            <li>
              <div>
                <span class="icon-node">
                    <b *ngIf="isexpanded">-</b>
                    <b *ngIf="!isexpanded">+</b>
                </span>
                <span>{{ treeModel.ptext || "root" }}</span>
              </div>
              <ng-template [ngIf]="isexpanded">
                <app-tree *ngFor="let child of treeModel.children" [tree]="child"></app-tree>
              </ng-template>
            </li>
          </ng-container>
          <ng-container *ngIf="!isNode(treeModel)">
            <li>
              <div >{{ treeModel.ptext }}</div>
            </li>
          </ng-container>
      </ul>
    `,
    styleUrls: ['./tree.component.scss']
  })
  export class TreeInternalComponent implements OnInit, OnDestroy {

    @Input()
    tree: Tree;

    constructor(
    ) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

}
