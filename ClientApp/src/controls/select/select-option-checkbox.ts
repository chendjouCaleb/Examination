import {Directive, OnInit} from '@angular/core';
import {MsfSelectOption} from './select-option';
import {MsCheckbox, MsCheckboxChange} from '@ms-fluent/components';

@Directive({
  selector: 'MsfCheckbox[MsfSelectOptionCheckbox]'
})
export class MsfSelectOptionCheckbox implements OnInit{
  constructor(public checkbox: MsCheckbox, private selectOption: MsfSelectOption) {
  }

  ngOnInit(): void {
    this.checkbox.change.subscribe((event: MsCheckboxChange) => {
      if (event.checked){
        this.selectOption.select();
      }else {
        this.selectOption.deselect();
      }
    })
  }
}
