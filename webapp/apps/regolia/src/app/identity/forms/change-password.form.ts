import {EvFormControl, EvFormGroup} from "src/controls";
import {ChangePasswordModel, UserAddModel} from "examination/app/identity";

export class ChangePasswordForm extends EvFormGroup<ChangePasswordModel>{
  constructor() {
    super({
      currentPassword: new EvFormControl('currentPassword'),
      newPassword: new EvFormControl('newPassword'),
      newPasswordMatch: new EvFormControl('newPasswordMatch')
    });
  }

  getModel(): ChangePasswordModel {
    const model = new ChangePasswordModel();
    model.newPassword = this.controls.newPassword.value;
    model.newPasswordMatch = this.controls.newPasswordMatch.value;
    model.currentPassword = this.controls.currentPassword.value;
    return model;
  }
}
