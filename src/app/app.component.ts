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
      mobile: [ '', Validators.required ]
    });
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
      alert('请输入正确的手机号码!');
    } else {
      let arr = [this.myform.get('mobile').value];
      Object.keys(this.inputMap).forEach(k => {
        arr.push(this.inputMap[k].myform.get('mobile').value);
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
