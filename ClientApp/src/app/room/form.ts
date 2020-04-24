import {EvFormControl, EvFormGroup} from "../../controls/form/forms";
import {RoomAddModel, RoomEditModel, RoomNameModel} from "../../models";


export class RoomAddForm extends EvFormGroup<RoomAddModel> {
  constructor() {
    super({
      name: new EvFormControl("name", ""),
      capacity: new EvFormControl("capacity", ""),
      address: new EvFormControl("address", "")
    });
  }

  getModel(): RoomAddModel {
    const model = new RoomAddModel();
    model.name = this.controls.name.value;
    model.capacity = +this.controls.capacity.value;
    model.address = this.controls.address.value;
    return model;
  }
}


export class RoomEditForm extends EvFormGroup<RoomEditModel> {
  constructor(value: any = {}) {
    super({
      capacity: new EvFormControl("capacity", value.capacity),
      address: new EvFormControl("address", value.address)
    });
  }

  getModel(): RoomEditModel {
    const model = new RoomEditModel();
    model.capacity = +this.controls.capacity.value;
    model.address = this.controls.address.value;
    return model;
  }
}


export class RoomNameForm extends EvFormGroup<RoomNameModel> {
  constructor(value: any = {}) {
    super({
      name: new EvFormControl("name", value.name)
    });
  }

  getModel(): RoomNameModel {
    const model = new RoomNameModel();
    model.name = this.controls.name.value;
    return model;
  }
}
