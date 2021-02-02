import {SchoolAddModel, SchoolEditModel, SchoolIdentifierModel} from 'src/models';
import {EvFormControl, EvFormGroup} from 'examination/controls';

export class SchoolAddForm extends EvFormGroup<SchoolAddModel> {
  constructor() {
    super({
      name: new EvFormControl('name', ''),
      acronym: new EvFormControl('acronym', ''),
      identifier: new EvFormControl('identifier', ''),
      address: new EvFormControl('address', '')
    });
  }

  getModel(): SchoolAddModel {
    const model = new SchoolAddModel();
    model.name = this.controls.name.value;
    model.identifier = this.controls.identifier.value;
    model.address = this.controls.address.value;
    model.acronym = this.controls.acronym.value;
    return model;
  }
}


export class SchoolEditForm extends EvFormGroup<SchoolEditModel> {
  constructor(value: any = {}) {
    super({
      name: new EvFormControl('name', value.name),
      address: new EvFormControl('address', value.address),
      acronym: new EvFormControl('acronym', value.acronym),
    });
  }

  getModel(): SchoolEditModel {
    const model = new SchoolEditModel();
    model.name = this.controls.name.value;
    model.address = this.controls.address.value;
    model.acronym = this.controls.acronym.value;
    return model;
  }
}

export class SchoolIdentifierForm extends EvFormGroup<SchoolIdentifierModel> {
  constructor(value: any = {}) {
    super({
      identifier: new EvFormControl('identifier', value.identifier)
    });
  }

  getModel(): SchoolIdentifierModel {
    const model = new SchoolIdentifierModel();
    model.identifier = this.controls.identifier.value;
    return model;
  }
}
