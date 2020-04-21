import {Component, Input} from "@angular/core";

@Component({
  template: `<i class="ms-Icon ms-Icon--{{iconName}}"></i>`,
  styleUrls: ['float-button.scss'],
  selector: 'float-button',
  host: {
    class: 'ms-depth-4'
  }
})

export class FloatButton {
  @Input()
  iconName: string = 'Add';
}
