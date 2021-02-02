import {EvFormControl, EvFormGroup} from "examination/controls";
import {Room, RoomAddModel} from "examination/models";

export class RoomAddForm extends EvFormGroup<RoomAddModel> {
  constructor(value: any = {}) {
    super({
      name: new EvFormControl("name", value.name),
      capacity: new EvFormControl("capacity", value.capacity),
      address: new EvFormControl("address", value.address),
      school: new EvFormControl("school", value.school),
      department: new EvFormControl("department", value.department),
      level: new EvFormControl("level", value.level)
    });
  }

  getModel(): RoomAddModel {
    const model = new RoomAddModel();
    model.name = this.controls.name.value;
    model.capacity = +this.controls.capacity.value;
    model.address = this.controls.address.value;
    model.school = this.controls.school.value;
    model.department = this.controls.department.value;
    model.level = this.controls.level.value;
    return model;
  }
}


export class RoomEditForm extends EvFormGroup<RoomAddModel> {
  constructor(room: Room) {
    super({
      name: new EvFormControl("name", room.name),
      capacity: new EvFormControl("capacity", room.capacity),
      address: new EvFormControl("address", room.address)
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



