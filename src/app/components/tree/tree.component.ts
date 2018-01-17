import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-tree',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div>this is tree component</div>
  `,
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
