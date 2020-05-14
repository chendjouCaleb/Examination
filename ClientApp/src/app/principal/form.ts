import {EvFormControl, EvFormGroup} from 'examination/controls';
import {PrincipalAddModel, PrincipalEditModel} from 'examination/models';

export class PrincipalAddForm extends EvFormGroup<PrincipalAddModel> {
  constructor() {
    super({
      role: new EvFormControl('role', ''),
      user: new EvFormControl('user', '')
    });
  }

  getModel(): PrincipalAddModel {
    const model = new PrincipalAddModel();
    model.role = this.controls.role.value;
    model.user = this.controls.user.value;
    return model;
  }
}


export class PrincipalEditForm extends EvFormGroup<PrincipalEditModel> {
  constructor(value: any = {}) {
    super({
      role: new EvFormControl('role', value.role)
    });
  }

  getModel(): PrincipalEditModel {
    const model = new PrincipalEditModel();
    model.role = this.controls.role.value;
    return model;
  }
}
