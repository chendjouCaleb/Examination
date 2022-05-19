import {EvFormControl, EvFormGroup} from "src/controls";
import {LoginModel, UserAddModel} from "examination/app/identity";

export class LoginForm extends EvFormGroup<LoginModel>{
  constructor() {
    super({
      id: new EvFormControl('id'),
      password: new EvFormControl('password'),
      isPersisted: new EvFormControl('isPersisted', false),
    });
  }

  getModel(): LoginModel {
    const model = new LoginModel();
    model.id = this.controls.id.value;
    model.password = this.controls.password.value;
    model.isPersisted = this.controls.isPersisted.value;
    return model;
  }
}
