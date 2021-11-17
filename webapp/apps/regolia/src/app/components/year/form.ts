import {EvFormControl, EvFormGroup} from 'examination/controls';
import {YearAddModel} from 'examination/models';


export class YearAddForm extends EvFormGroup<YearAddModel> {
  constructor(value: any = {}) {
    super({
      expectedStartDate: new EvFormControl('expectedStartDate', value.expectedStartDate),
      expectedEndDate: new EvFormControl('expectedEndDate', value.expectedEndDate)
    });
  }

  getModel(): YearAddModel {
    const model = new YearAddModel();
    model.expectedStartDate = this.controls.expectedStartDate.value;
    model.expectedEndDate = this.controls.expectedEndDate.value;
    return model;
  }
}
