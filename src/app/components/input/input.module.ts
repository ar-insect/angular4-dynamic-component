import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputComponent } from './input.component';
import { INPUT_DEFAULT_CONFIG_PROVIDER } from './input-config';
import { MessageComponent } from './message/message.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [ InputComponent, MessageComponent, ],
  declarations: [ InputComponent, MessageComponent, ],
  providers: [ INPUT_DEFAULT_CONFIG_PROVIDER ],
})
export class InputModule { }
