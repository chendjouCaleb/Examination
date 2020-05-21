import {EvFormControl, EvFormGroup} from "examination/controls";
import {ApplicationAddModel, ApplicationInfoModel} from "examination/models";



export class ApplicationAddForm extends EvFormGroup<ApplicationAddModel> {
  constructor(value: any = {}) {
    super({
      fullName: new EvFormControl("fullName", value.fullName),
      registrationId: new EvFormControl("registrationId", ""),
      gender: new EvFormControl("gender", ""),
      birthDate: new EvFormControl("birthDate", ""),
      speciality: new EvFormControl("speciality", ""),
    });
  }

  getModel(): ApplicationAddModel {
    const model = new ApplicationAddModel();
    model.fullName = this.controls.fullName.value;
    model.registrationId = this.controls.registrationId.value;
    model.gender = this.controls.gender.value;
    model.birthDate = this.controls.birthDate.value;
    model.speciality = this.controls.speciality.value;
    return model;
  }
}



export class ApplicationInfoForm extends EvFormGroup<ApplicationInfoModel> {
  constructor(value: any = {}) {
    super({
      fullName: new EvFormControl("fullName", value.fullName),
      gender: new EvFormControl("gender", value.gender),
      birthDate: new EvFormControl("birthDate", value.birthDate),
      registrationId: new EvFormControl("registrationId", value.registrationId),
    });
  }

  getModel(): ApplicationInfoModel {
    const model = new ApplicationInfoModel();
    model.fullName = this.controls.fullName.value;
    model.gender = this.controls.gender.value;
    model.birthDate = this.controls.birthDate.value;
    model.registrationId = this.controls.registrationId.value;

    return model;
  }
}


