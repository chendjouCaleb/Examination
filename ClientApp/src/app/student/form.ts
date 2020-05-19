import {EvFormControl, EvFormGroup} from "examination/controls";
import {StudentAddModel, StudentInfoModel, StudentRegistrationIdModel} from "examination/models";


export class StudentAddForm extends EvFormGroup<StudentAddModel> {
  constructor() {
    super({
      fullName: new EvFormControl("fullName", ""),
      registrationId: new EvFormControl("registrationId", ""),
      gender: new EvFormControl("gender", ""),
      birthDate: new EvFormControl("birthDate", ""),
      group: new EvFormControl("group", ""),
      speciality: new EvFormControl("speciality", ""),
    });
  }

  getModel(): StudentAddModel {
    const model = new StudentAddModel();
    model.fullName = this.controls.fullName.value;
    model.registrationId = this.controls.registrationId.value;
    model.gender = this.controls.gender.value;
    model.birthDate = this.controls.birthDate.value;
    model.group = this.controls.group.value;
    model.speciality = this.controls.speciality.value;
    return model;
  }
}



export class StudentInfoForm extends EvFormGroup<StudentInfoModel> {
  constructor() {
    super({
      fullName: new EvFormControl("fullName", ""),
      gender: new EvFormControl("gender", ""),
      birthDate: new EvFormControl("birthDate", "")
    });
  }

  getModel(): StudentInfoModel {
    const model = new StudentInfoModel();
    model.fullName = this.controls.fullName.value;
    model.gender = this.controls.gender.value;
    model.birthDate = this.controls.birthDate.value;
    return model;
  }
}


export class StudentRegistrationIdForm extends EvFormGroup<StudentRegistrationIdModel> {
  constructor(value: any = {}) {
    super({
      registrationId: new EvFormControl("registrationId", value.registrationId)
    });
  }

  getModel(): StudentRegistrationIdModel {
    const model = new StudentRegistrationIdModel();
    model.registrationId = this.controls.registrationId.value;
    return model;
  }
}
