import {OrganisationAddModel, OrganisationEditModel, OrganisationIdentifierModel} from "../../models";
import {EvFormControl, EvFormGroup} from "../../controls/form/forms";

export class OrganisationAddForm extends EvFormGroup<OrganisationAddModel> {
  constructor() {
    super({
      name: new EvFormControl("name", ""),
      identifier: new EvFormControl("identifier", ""),
      address: new EvFormControl("address", "")
    });
  }

  getModel(): OrganisationAddModel {
    const model = new OrganisationAddModel();
    model.name = this.controls.name.value;
    model.identifier = this.controls.identifier.value;
    model.address = this.controls.address.value;
    return model;
  }
}



export class OrganisationEditForm extends EvFormGroup<OrganisationEditModel> {
  constructor(value: any = {}) {
    super({
      name: new EvFormControl("name", value.name),
      address: new EvFormControl("address", value.address)
    });
  }

  getModel(): OrganisationEditModel {
    const model = new OrganisationEditModel();
    model.name = this.controls.name.value;
    model.address = this.controls.address.value;
    return model;
  }
}

export class OrganisationIdentifierForm extends EvFormGroup<OrganisationIdentifierModel> {
  constructor(value: any = {}) {
    super({
      identifier: new EvFormControl("identifier", value.identifier)
    });
  }

  getModel(): OrganisationAddModel {
    const model = new OrganisationAddModel();
    model.identifier = this.controls.identifier.value;
    return model;
  }
}
