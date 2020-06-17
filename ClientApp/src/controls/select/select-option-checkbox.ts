import {Directive, OnInit} from '@angular/core';
import {MsfCheckbox, MsfCheckboxChange} from 'fabric-docs';
import {MsfSelectOption} from "./select-option";

@Directive({
  selector: 'MsfCheckbox[MsfSelectOptionCheckbox]'
})
export class MsfSelectOptionCheckbox implements OnInit{
  constructor(public checkbox: MsfCheckbox, private selectOption: MsfSelectOption) {
  }

  ngOnInit(): void {
    this.checkbox.change.subscribe((event:MsfCheckboxChange) => {
      if(event.checked){
        this.selectOption.select();
      }else {
        this.selectOption.deselect();
      }
    })
  }
}
