import {FormControl, FormGroup, Validators} from '@angular/forms';
import {validateSync} from 'class-validator';


export class EvFormGroup<T> extends FormGroup {


  constructor(controls: any) {
    super(controls);

    this.valueChanges.subscribe(() => {
      this.doValidation();
    });

    this.doValidation();
  }


  getControls(): EvFormControl[] {
    return Object.keys(this.controls)
      .map(k => this.controls[k] as EvFormControl);
  }

  getModel(): T {
    return this.value as T;
  }


  getControl(name: string) {
    return this.controls[name] as EvFormControl;
  }

  addMessageErrors(errors) {
    Object.keys(errors).map(key => {
      if (this.getControl(key)) {
        this.getControl(key).setErrors({message: errors[key]});
      }
    });
  }

  doValidation() {

    const result = validateSync(this.getModel());

    result.forEach(error => {
      const control = this.getControl(error.property);
      if (control) {
        Object.values(error.constraints).forEach(m => control.addError(m));
      }
    });

  }
}


export class EvFormControl extends FormControl {
  name: string;

  constructor(name: string, value: any) {
    super(value, Validators.nullValidator);
    this.name = name;
  }

  addMessageErrors(errors) {
    if (errors[this.name]) {
      this.setErrors({message: errors[this.name]});
    }
  }

  addError(message: string) {
    if (!this.errors || !this.errors.message) {
      this.setErrors({message: []});
    }
    if (this.errors.message.indexOf(message) < 0) {
      this.errors.message.push(message);
    }
  }
}
