import {EvFormControl, EvFormGroup} from 'examination/controls';
import {TestAddModel, TestEditDateModel, TestEditModel} from 'examination/models';


export class TestAddForm extends EvFormGroup<TestAddModel> {
  constructor(value: any = {}) {
    super({
      coefficient: new EvFormControl('coefficient', value.coefficient),
      radical: new EvFormControl('radical', value.radical),
      useAnonymity: new EvFormControl('useAnonymity', false),
      day: new EvFormControl('day', value.day),
      startHour: new EvFormControl('startHour', value.startHour),
      endHour: new EvFormControl('endHour', value.endHour),
      course: new EvFormControl('course', value.course),
      examinationLevel: new EvFormControl('examinationLevel', value.examinationLevel),
      examinationDepartment: new EvFormControl('examinationDepartment', value.examinationDepartment)
    });
  }

  getModel(): TestAddModel {
    const model = new TestAddModel();
    model.coefficient = +this.controls.coefficient.value;
    model.radical = +this.controls.radical.value;
    model.useAnonymity = !!this.controls.useAnonymity.value;
    model.day = this.controls.day.value;
    model.startHour = this.controls.startHour.value;
    model.endHour = this.controls.endHour.value;
    model.course = this.controls.course.value;
    model.examinationLevel = this.controls.examinationLevel.value;
    model.examinationDepartment = this.controls.examinationDepartment.value;
    return model;
  }
}


export class TestEditForm extends EvFormGroup<TestEditModel> {
  constructor(value: any = {}) {
    super({
      useAnonymity: new EvFormControl('useAnonymity', value.useAnonymity),
      coefficient: new EvFormControl('coefficient', value.coefficient)
    });
  }

  getModel(): TestEditModel {
    const model = new TestEditModel();
    model.useAnonymity = this.controls.useAnonymity.value;
    model.coefficient = +this.controls.coefficient.value;
    return model;
  }
}


export class TestEditDateForm extends EvFormGroup<TestEditDateModel> {
  constructor(value: any = {}) {
    super({
      day: new EvFormControl('day', value.day),
      startHour: new EvFormControl('startHour', value.startHour),
      endHour: new EvFormControl('endHour', value.endHour)
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
