import {
  Component, OnInit, AfterViewInit, OnDestroy, Optional, Inject, ViewChild, Host, Self, DoCheck
} from '@angular/core';

import { INPUT_CONFIG, INPUT_DEFAULT_CONFIG, InputConfig } from './input-config';


@Component({
  selector: 'app-my-input',
  template: `
    <input type="text" placeholder="请输入" />
    <ng-content select="app-input-message"></ng-content>
    <div>+++++</div>
  `,
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, DoCheck {
  config: InputConfig;
  constructor(
    @Optional() @Inject(INPUT_DEFAULT_CONFIG) defaultConfig: InputConfig,
    @Optional() @Inject(INPUT_CONFIG) config: InputConfig,
  ) {
    this.config = { ...defaultConfig, ...config };
    // console.log(messageService);
   }
  ngDoCheck() {
    // console.log('"docheck."');
  }
  ngOnInit() {
  }

}
