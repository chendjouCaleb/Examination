import {Component, Input} from '@angular/core';

@Component({
  selector: 'labelled, [labelled]',
  template: `
      <ng-content></ng-content> <span style="margin-left: 7px">{{text}}</span>`,
  styles: [':host { display: flex; align-items: center}']
})
export class Labelled {
  @Input()
  text: string;
}
