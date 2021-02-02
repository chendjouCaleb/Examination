import {EvFormControl, EvFormGroup} from "examination/controls";
import {IScorePaperModel, PaperPeriodModel, PaperReportModel, ScorePaper, TestScore} from "examination/models";
import {List} from "@positon/collections";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

export class PaperPeriodForm extends EvFormGroup<PaperPeriodModel> {
  constructor(value: any = {}) {
    super({
      day: new EvFormControl("day", value.day),
      startHour: new EvFormControl("startHour", value.startHour),
      endHour: new EvFormControl("endHour", value.endHour)
    });

  }

  getModel(): PaperPeriodModel {
    const model = new PaperPeriodModel();
    model.day = this.controls.day.value;
    model.startHour = this.controls.startHour.value;
    model.endHour = this.controls.endHour.value;
    return model;
  }
}


export class PaperReportForm extends EvFormGroup<PaperReportModel> {
  constructor(value: any = {}) {
    super({
      anonymity: new EvFormControl("anonymity", value.anonymity),
      comment: new EvFormControl("comment", value.comment)
    });
  }

  getModel(): PaperReportModel {
    const model = new PaperReportModel();
    model.anonymity = this.controls.anonymity.value;
    model.comment = this.controls.comment.value;
    return model;
  }
}


export class PaperScoreForm extends FormGroup {
  constructor(scores: List<TestScore> | Array<TestScore>, values: ScorePaper[]) {
    super(PaperScoreForm.createControls(scores));

    for (let i = 0; i < values.length; i++) {
      this.getControl()[i].setValue(values[i].value);
    }
  }

  static createControls(scores: List<TestScore> | Array<TestScore>) {
    const controls: { [key: string]: AbstractControl } = {};

    for (const score of scores) {
      controls[score.id] = new FormControl(null, Validators.compose(
        [Validators.required, Validators.min(0), Validators.max(score.radical)]));
    }
    return controls;
  }

  getModel(): IScorePaperModel[] {
    const controls = Object.keys(this.controls)
      .map<IScorePaperModel>(p => {
        return {testScoreId: p, value: this.controls[p].value}
      });
    return controls;
  }

  getControl(): FormControl[] {
    return Object.values(this.controls) as FormControl[];
  }

  getErrorMessage(name: string) {
    const errors = this.controls[name].errors;
    let messages = [];
    if (errors) {
      for (let errorName in errors) {
        switch (errorName) {
          case 'required':
            messages.push('Cette note est obligatoire');
            break;
          case 'max':
            messages.push(`Cette note doit être inférieure ou égale à ${errors.max.max}`);
            break;
          case 'min':
            messages.push(`Cette note doit être supérieure ou égale à ${errors.min.min}`);
            break;
        }
      }
    }
    return messages;
  }
}
