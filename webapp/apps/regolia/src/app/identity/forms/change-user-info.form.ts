import {EvFormControl, EvFormGroup} from "src/controls";
import {UserAddModel, UserInfoModel} from "examination/app/identity";
import {User} from "examination/entities";

export class ChangeUserInfoForm extends EvFormGroup<UserInfoModel>{
  constructor(user: User) {
    super({
      lastName: new EvFormControl('lastName', user.lastName),
      firstName: new EvFormControl('firstName', user.firstName),
      gender: new EvFormControl('gender', user.gender),
      birthDate: new EvFormControl('birthDate', user.birthDate),
    });

  }

  getModel(): UserInfoModel {
    const model = new UserInfoModel();
    model.gender = this.controls.gender.value;
    model.birthDate = this.controls.birthDate.value;

    model.lastName = this.controls.lastName.value;
    model.firstName = this.controls.firstName.value;
    return model;
  }
}
