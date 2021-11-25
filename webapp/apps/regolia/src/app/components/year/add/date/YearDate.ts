import {Component, Inject, Input} from "@angular/core";
import {YearAddForm} from "../../form";
import {Year} from "examination/entities";
import {YearHttpClient} from "examination/models/http";
import {MS_DIALOG_DATA, MsDialogRef} from "@ms-fluent/components";
import {AlertEmitter} from "src/controls";

@Component({
  templateUrl: 'YearDate.html',
  selector: 'YearAdd'
})
export class YearDate {
  @Input()
  year: Year;

  form: YearAddForm;

  constructor(private httpClient: YearHttpClient,
              private dialog: MsDialogRef<YearDate>,
              @Inject(MS_DIALOG_DATA) data,
              private alertEmitter: AlertEmitter) {
    this.form = new YearAddForm(data.year);
    this.year = data.year;
  }

  async add() {
    const model = this.form.getModel();
    await this.httpClient.changeDate(this.year, model);

    this.year.expectedStartDate = new Date(model.expectedStartDate);
    this.year.expectedEndDate = new Date(model.expectedEndDate);

    this.alertEmitter.success('Les dates ont été changées !');
    this.dialog.close();
  }
}
