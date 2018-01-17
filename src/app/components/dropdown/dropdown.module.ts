import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DropdownComponent } from './dropdown.component';
import { DropdownButtonComponent } from './dropdown-button.component';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    FormsModule,
  ],
  declarations: [
    DropdownComponent,
    DropdownButtonComponent,
    DropdownDirective,
  ],
  exports: [
    DropdownComponent,
    DropdownButtonComponent,
    DropdownDirective,
  ]
})
export class DropdownModule { }
