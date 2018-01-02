import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, OnDestroy {
  myform: FormGroup;
  @Input() container;
  @Input() randomString;
  @Input() ref; // 这里需要注入当前组件的ViewRef
  @Output() removeChanged = new EventEmitter();
  constructor(
    private fb: FormBuilder
  ) { 
    this.myform = this.fb.group({
      email: [
          '', 
          [ 
            Validators.required, 
            Validators.pattern("^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$")
          ]
      ]
    });
    this.myform.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  ngOnInit() {
  }

  formErrors = {
    'email': '',
  };

  validationMessages = {
    'email': {
      'required': '邮箱必须输入。',
      'pattern': '请输入正确的邮箱地址。'
    }
  }

  onValueChanged(data?: any) {
    if (!this.myform) {
      return;
    }
    const form = this.myform;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
  
  remove(): void {
    let index = this.container.indexOf(this.ref); // 获取到当前组件在整个容器的index
    console.log(this.container);
    this.container.remove(index); // 移除当前组件
    this.removeChanged.emit(this.randomString);
  }

  ngOnDestroy() {
  }
}
