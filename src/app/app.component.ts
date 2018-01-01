import {
  Component, ViewChild, ViewContainerRef, ComponentFactory,
  ComponentRef, ComponentFactoryResolver, OnDestroy
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InputComponent } from './input/input.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  myform: FormGroup;
  inputMap = {};
  componentRef: ComponentRef<InputComponent>;
  @ViewChild("inputContainer", { read: ViewContainerRef }) container: ViewContainerRef;
  constructor(
    private fb: FormBuilder,
    private resolver: ComponentFactoryResolver
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

  createComponent() {
    let rndString = this.randomString();
    const factory: ComponentFactory<InputComponent> = this.resolver.resolveComponentFactory(InputComponent);
    this.componentRef = this.container.createComponent(factory);
    // console.log('创建组件实例对象', this.componentRef.instance);
    this.componentRef.instance.container = this.container;
    this.componentRef.instance.ref = this.componentRef;
    this.componentRef.instance.randomString = rndString;
    this.inputMap[ rndString ] = this.componentRef.instance;
    this.componentRef.instance.removeChanged.subscribe((key: string) => this.remove(key));
  }

  randomString(): string {
    return Math.random().toString(36).substr(2);
  }

  isValidate(): boolean {
    let flag = true;
    let keys = Object.keys(this.inputMap);
    let theValidate = this.myform.status === 'VALID';
    keys.forEach(key => {
      if ('INVALID' === this.inputMap[key]['myform']['status']) {
        return flag = false;
      }
    });
    return keys.length > 0 ? (flag && theValidate) : theValidate;
  }

  save(): void {
    if (!this.isValidate()) {
      alert('请输入正确的邮箱地址!');
    } else {
      let arr = [this.myform.get('email').value];
      Object.keys(this.inputMap).forEach(k => {
        arr.push(this.inputMap[k].myform.get('email').value);
      });
      alert(arr.join(','));
    }
  }

  remove(key: string): void {
    // console.log(key);
    delete this.inputMap[key];
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }
}
