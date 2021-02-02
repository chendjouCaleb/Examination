import {EvFormControl, EvFormGroup} from "examination/controls";
import {SpecialityAddModel, SpecialityEditModel } from "examination/models";


export class SpecialityAddForm extends EvFormGroup<SpecialityAddModel> {
  constructor() {
    super({
      name: new EvFormControl("name", ""),
      description: new EvFormControl("description", ""),
      levels: new EvFormControl("levels",  [])
    });
  }

  getModel(): SpecialityAddModel {
    const model = new SpecialityAddModel();
    model.name = this.controls.name.value;
    model.description = this.controls.description.value;
    model.levels = this.controls.levels.value;
    return model;
  }
}


export class SpecialityEditForm extends EvFormGroup<SpecialityEditModel> {
  constructor(value: any = {}) {
    super({
      name: new EvFormControl("name", value.name),
      description: new EvFormControl("description", value.description),
    });
  }

  getModel(): SpecialityEditModel {
    const model = new SpecialityEditModel();
    model.name = this.controls.name.value;
    model.description = this.controls.description.value;

    return model;
  }
}
