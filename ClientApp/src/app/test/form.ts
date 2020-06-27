import {EvFormControl, EvFormGroup} from "examination/controls";
import {TestAddModel, TestEditDateModel, TestEditModel} from "examination/models";


export class TestAddForm extends EvFormGroup<TestAddModel> {
  constructor(value:any = {}) {
    super({
      name: new EvFormControl("name", value.name),
      code: new EvFormControl("code", value.code),
      radical: new EvFormControl("radical", value.radical),
      coefficient: new EvFormControl("coefficient", value.coefficient),
      useAnonymity: new EvFormControl("useAnonymity",  false  ),
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
    model.useAnonymity = !!this.controls.useAnonymity.value;
    model.day = this.controls.day.value;
    model.startHour = this.controls.startHour.value;
    model.endHour = this.controls.endHour.value;
    model.speciality = this.controls.speciality.value;
    return model;
  }
}

export class TestEditForm extends EvFormGroup<TestEditModel> {
  constructor(value:any = {}) {
    super({
      name: new EvFormControl("name", value.name),
      code: new EvFormControl("code", value.code),
      radical: new EvFormControl("radical", value.radical),
      coefficient: new EvFormControl("coefficient", value.coefficient)
    });
  }

  getModel(): TestEditModel {
    const model = new TestEditModel();
    model.name = this.controls.name.value;
    model.code = this.controls.code.value;
    model.radical = this.controls.radical.value;
    model.coefficient = +this.controls.coefficient.value;
    return model;
  }
}





export class TestEditDateForm extends EvFormGroup<TestEditDateModel> {
  constructor(value:any = {}) {
    super({
      day: new EvFormControl("day",  value.day),
      startHour: new EvFormControl("startHour",  value.startHour),
      endHour: new EvFormControl("endHour",  value.endHour)
    });
  }

  getModel(): TestAddModel {
    const model = new TestAddModel();
    model.day = this.controls.day.value;
    model.startHour = this.controls.startHour.value;
    model.endHour = this.controls.endHour.value;
    return model;
  }
}
