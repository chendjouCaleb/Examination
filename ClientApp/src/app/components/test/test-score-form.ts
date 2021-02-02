import {EvFormControl, EvFormGroup} from 'examination/controls';
import {ScoreAddModel} from 'examination/models';

export class TestScoreAddForm extends EvFormGroup<ScoreAddModel> {
  constructor(value: any = {}) {
    super({
      name: new EvFormControl('name', value.name),
      radical: new EvFormControl('radical', value.radical)
    });
  }

  getModel(): ScoreAddModel {
    const model = new ScoreAddModel();
    model.name = this.controls.name.value;
    model.radical = this.controls.radical.value;
    return model;
  }
}
