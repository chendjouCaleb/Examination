import { FormControl } from '@angular/forms';

export class EmailValidators {
    static email() {
      return (control: FormControl): { [key: string]: any } => {
        const value = control.value;
        if (!(/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(value))) {
          return {'email': {'email': true, 'actualValue': value}};
        } else {
          return null;
        }
      };
    }
}


export class NameValidator {
    static namePattern() {
      return (control: FormControl): { [key: string]: any } => {
        const value = control.value;
        if (!(/^[a-zA-Z_éèçà]+$/.test(value))) {
          return {'name': {'name': true, 'actualValue': value}};
        } else {
          return null;
        }
      };
    }
}
