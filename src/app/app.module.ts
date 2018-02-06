import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InputComponent } from './input/input.component';

import { DropdownModule } from './components/dropdown/dropdown.module';
import { TreeModule } from './components/tree/tree.module';
import { AppLayoutDirective } from './layout.directive';
import { InputModule } from './components/input/input.module';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    AppLayoutDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    TreeModule,
    InputModule,
  ],
  entryComponents: [ InputComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
