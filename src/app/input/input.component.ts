import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  myform: FormGroup;
  // mobile;
  @Input() container;
  @Input() randomString;
  @Input() ref; // 这里需要注入当前组件的ViewRef
  @Output() removeChanged = new EventEmitter();
  constructor(
    private fb: FormBuilder
  ) { 
    this.myform = this.fb.group({
      mobile: [ '', Validators.required ]
    });
  }

  ngOnInit() {
  }
  
  remove(): void {
    let index = this.container.indexOf(this.ref); // 获取到当前组件在整个容器的index
    // console.log(this.ref);
    this.container.remove(index); // 移除当前组件
    this.removeChanged.emit(this.randomString);
    
  }

}
