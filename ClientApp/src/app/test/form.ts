import {EvFormControl, EvFormGroup} from "examination/controls";
import {TestAddModel} from "examination/models";


export class TestAddForm extends EvFormGroup<TestAddModel> {
  constructor(value:any = {}) {
    super({
      name: new EvFormControl("name", value.name),
      code: new EvFormControl("code", value.code),
      radical: new EvFormControl("radical", value.radical),
      coefficient: new EvFormControl("coefficient", value.coefficient),
      useAnonymity: new EvFormControl("useAnonymity",  value.useAnonymity),
      day: new EvFormControl("day",  value.day),
      startHour: new EvFormControl("startHour",  value.startHour),
      endHour: new EvFormControl("endHour",  value.endHour),
      speciality: new EvFormControl("speciality", value.speciality),
    });
  }

  getModel(): TestAddModel {
    const model = new TestAddModel();
    model.name = this.controls.name.value;
    model.code = this.controls.code.value;
    model.radical = this.controls.radical.value;
    model.coefficient = +this.controls.coefficient.value;
    model.useAnonymity = !!this.controls.code.value;
    model.day = this.controls.day.value;
    model.startHour = this.controls.startHour.value;
    model.endHour = this.controls.endHour.value;
    model.speciality = this.controls.speciality.value;
    return model;
  }
}


