import {EvFormControl, EvFormGroup} from "examination/controls";
import {SpecialityAddModel, SpecialityNameModel} from "examination/models";


export class SpecialityAddForm extends EvFormGroup<SpecialityAddModel> {
  constructor() {
    super({
      name: new EvFormControl("name", "")
    });
  }

  getModel(): SpecialityAddModel {
    const model = new SpecialityAddModel();
    model.name = this.controls.name.value;
    return model;
  }
}


export class SpecialityNameForm extends EvFormGroup<SpecialityNameModel> {
  constructor(value: any = {}) {
    super({
      name: new EvFormControl("name", value.name)
    });
  }

  getModel(): SpecialityNameModel {
    const model = new SpecialityNameModel();
    model.name = this.controls.name.value;
    return model;
  }
}
