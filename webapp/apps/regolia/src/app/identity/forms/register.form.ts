import {EvFormControl, EvFormGroup} from "src/controls";
import {UserAddModel} from "examination/app/identity";

export class RegisterForm extends EvFormGroup<UserAddModel>{
  constructor() {
    super({
      lastName: new EvFormControl('lastName'),
      firstName: new EvFormControl('firstName'),
      userName: new EvFormControl('userName'),
      email: new EvFormControl('email'),
      password: new EvFormControl('password'),
      passwordMatch: new EvFormControl('passwordMatch')
    });

  }

  getModel(): UserAddModel {
    const model = new UserAddModel();
    model.email = this.controls.email.value;
    model.password = this.controls.password.value;
    model.passwordMatch = this.controls.passwordMatch.value;

    model.lastName = this.controls.lastName.value;
    model.firstName = this.controls.firstName.value;
    model.userName = this.controls.userName.value;
    return model;
  }
}
