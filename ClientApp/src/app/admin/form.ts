import {EvFormControl, EvFormGroup} from "examination/controls";
import {AdminAddModel, AdminEditModel} from "examination/models";

export class AdminAddForm extends EvFormGroup<AdminAddModel> {
  constructor() {
    super({
      email: new EvFormControl("email", ""),
      role: new EvFormControl("role", "")
    });
  }

  getModel(): AdminAddModel {
    const model = new AdminAddModel();
    model.email = this.controls.email.value;
    model.role = this.controls.role.value;
    return model;
  }
}



export class AdminEditForm extends EvFormGroup<AdminEditModel> {
  constructor(value: any = {}) {
    super({
      role: new EvFormControl("role", value.role)
    });
  }

  getModel(): AdminEditModel {
    const model = new AdminEditModel();
    model.role = this.controls.role.value;
    return model;
  }
}
