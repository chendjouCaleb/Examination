import {EvFormControl, EvFormGroup} from "examination/controls";
import {GroupAddModel, GroupNameModel} from "examination/models";


export class GroupAddForm extends EvFormGroup<GroupAddModel> {
  constructor() {
    super({
      name: new EvFormControl("name", ""),
      room: new EvFormControl("room", ""),
      speciality: new EvFormControl("speciality", ""),
    });
  }

  getModel(): GroupAddModel {
    const model = new GroupAddModel();
    model.name = this.controls.name.value;
    model.room = this.controls.room.value;
    model.speciality = this.controls.speciality.value;
    return model;
  }
}


export class GroupNameForm extends EvFormGroup<GroupNameModel> {
  constructor(value: any = {}) {
    super({
      name: new EvFormControl("name", value.name)
    });
  }

  getModel(): GroupNameModel {
    const model = new GroupNameModel();
    model.name = this.controls.name.value;
    return model;
  }
}
