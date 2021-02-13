import {EvFormControl, EvFormGroup} from 'examination/controls';
import {LevelAddModel} from 'examination/models';


export class LevelAddForm extends EvFormGroup<LevelAddModel> {
  constructor() {
    super({
      specialities: new EvFormControl('specialities', [])
    });
  }

  getModel(): LevelAddModel {
    const model = new LevelAddModel();
    model.specialities = this.controls.specialities.value;
    return model;
  }
}


