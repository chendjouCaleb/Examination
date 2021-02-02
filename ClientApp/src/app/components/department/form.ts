import {DepartmentAddModel, DepartmentEditModel } from 'src/models';
import {EvFormControl, EvFormGroup} from 'examination/controls';

export class DepartmentAddForm extends EvFormGroup<DepartmentAddModel> {
  constructor() {
    super({
      name: new EvFormControl('name', ''),
      acronym: new EvFormControl('acronym', ''),
      user: new EvFormControl('user', ''),
      address: new EvFormControl('address', '')
    });
  }

  getModel(): DepartmentAddModel {
    const model = new DepartmentAddModel();
    model.name = this.controls.name.value;
    model.user = this.controls.user.value;
    model.address = this.controls.address.value;
    model.acronym = this.controls.acronym.value;
    return model;
  }
}


export class DepartmentEditForm extends EvFormGroup<DepartmentEditModel> {
  constructor(value: any = {}) {
    super({
      name: new EvFormControl('name', value.name),
      address: new EvFormControl('address', value.address),
      acronym: new EvFormControl('acronym', value.acronym),
    });
  }

  getModel(): DepartmentEditModel {
    const model = new DepartmentEditModel();
    model.name = this.controls.name.value;
    model.address = this.controls.address.value;
    model.acronym = this.controls.acronym.value;
    return model;
  }
}

