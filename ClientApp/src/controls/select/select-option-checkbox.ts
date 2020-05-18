import {Directive} from '@angular/core';
import {MsfCheckbox} from 'fabric-docs';

@Directive({
  selector: 'MsfCheckbox[MsfSelectOptionCheckbox]'
})
export class MsfSelectOptionCheckbox {
  constructor(public checkbox: MsfCheckbox) {
  }
}
