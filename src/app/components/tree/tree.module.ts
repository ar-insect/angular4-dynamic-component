import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeComponent } from './tree.component';
import { TreeInternalComponent } from './tree-internal.component';
import { TreeNodeDirective } from './tree-node.directive';
import { TreeNodeValueDirective } from './tree-node-value.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    TreeComponent,
    TreeInternalComponent,
    TreeNodeDirective,
    TreeNodeValueDirective,
  ],
  exports: [
    TreeComponent,
  ]
})
export class TreeModule { }
