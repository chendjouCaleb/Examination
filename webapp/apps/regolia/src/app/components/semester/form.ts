import {EvFormControl, EvFormGroup} from 'examination/controls';
import {SemesterAddModel} from 'examination/models';


export class SemesterAddForm extends EvFormGroup<SemesterAddModel> {
  constructor(value: any = {}) {
    super({
      expectedStartDate: new EvFormControl('expectedStartDate', value.expectedStartDate),
      expectedEndDate: new EvFormControl('expectedEndDate', value.expectedEndDate)
    });
  }

  getModel(): SemesterAddModel {
    const model = new SemesterAddModel();
    model.expectedStartDate = this.controls.expectedStartDate.value;
    model.expectedEndDate = this.controls.expectedEndDate.value;
    return model;
  }
}
