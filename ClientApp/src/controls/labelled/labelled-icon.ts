import {Component, Input} from "@angular/core";

@Component({
  selector: 'labelled-icon',
  template:  `<i class="ms-Icon ms-Icon--{{icon}}"></i> <span style="margin-left: 7px; margin-bottom: 2px">{{text}}</span>`,
  styles: [ ':host { display: flex; align-items: center }' ]
})
export class LabelledIcon {
  @Input()
  text: string;

  @Input()
  icon: string;
}
