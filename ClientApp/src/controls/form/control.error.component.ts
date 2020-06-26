import {Input, Component, OnInit} from '@angular/core';
import {EvFormControl} from './forms';
import {AbstractControl, FormGroupDirective} from '@angular/forms';

@Component({
    selector: 'app-control-error',
    templateUrl: 'control.error.component.html'
})
export class ControlErrorComponent implements OnInit{

  @Input()
  control: AbstractControl;

  @Input()
  get controlName(): string { return this._controlName; }
  set controlName(value: string) {
    this._controlName = value;
    if(this.form.form) {
      this.control = this.form.form.controls[value];
    }
  }
  _controlName: string;

  constructor(private form: FormGroupDirective) {
    if(form == null) {
      throw new Error("The control error must inside a formGroup directive")
    }
  }

  ngOnInit(): void {
    if(this._controlName) {
      this.controlName = this._controlName;
    }
  }

}
