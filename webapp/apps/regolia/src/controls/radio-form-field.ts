import {Component} from "@angular/core";

@Component({
  template: `
    <ng-content select="MsRadio, ms-radio"></ng-content>
    <div style="margin-left: 8px">
      <ng-content></ng-content>
    </div>
  `,
  styles: [':host {display: flex ; align-items: center}'],
  selector: 'MsRadioFormField, ms-radio-form-field, [MsRadioFormField], [ms-radio-form-field]'
})
export class MsRadioFormField {

}
