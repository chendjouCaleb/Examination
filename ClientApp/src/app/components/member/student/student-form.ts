import {EvFormControl, EvFormGroup} from 'examination/controls';
import {StudentContactModel, StudentInfoModel, StudentRegistrationIdModel} from 'examination/models';


export class StudentContactForm extends EvFormGroup<StudentContactModel> {
  constructor(value: any = {}) {
    super({
      phoneNumber: new EvFormControl('phoneNumber', value.phoneNumber),
      email: new EvFormControl('email', value.email),
      address: new EvFormControl('address', value.address),
    });
  }

  getModel(): StudentContactModel {
    const model = new StudentContactModel();
    model.phoneNumber = this.controls.phoneNumber.value;
    model.email = this.controls.email.value;
    model.address = this.controls.address.value;
    return model;
  }
}



export class StudentInfoForm extends EvFormGroup<StudentInfoModel> {
  constructor(value: any = {}) {
    super({
      fullName: new EvFormControl('fullName', value.fullName),
      gender: new EvFormControl('gender', value.gender),
      birthPlace: new EvFormControl('birthPlace', value.birthPlace),
      birthDate: new EvFormControl('birthDate', value.birthDate)
    });
  }

  getModel(): StudentInfoModel {
    const model = new StudentInfoModel();
    model.fullName = this.controls.fullName.value;
    model.gender = this.controls.gender.value;
    model.birthDate = this.controls.birthDate.value;
    model.birthPlace = this.controls.birthPlace.value;
    return model;
  }
}


export class StudentRegistrationIdForm extends EvFormGroup<StudentRegistrationIdModel> {
  constructor(value: any = {}) {
    super({
      registrationId: new EvFormControl('registrationId', value.registrationId)
    });
  }

  getModel(): StudentRegistrationIdModel {
    const model = new StudentRegistrationIdModel();
    model.registrationId = this.controls.registrationId.value;
    return model;
  }
}
