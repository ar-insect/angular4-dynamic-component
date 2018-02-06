import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeComponent } from './tree.component';
import { TreeNodeDirective } from './tree-node.directive';
import { TreeLeafDirective } from './tree-leaf.directive';
import { TreeInternalComponent } from './tree-internal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    TreeComponent,
    TreeInternalComponent,
    TreeNodeDirective,
    TreeLeafDirective,
  ],
  exports: [
    TreeComponent,
  ]
})
export class TreeModule { }
