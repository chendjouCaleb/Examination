import {Component, Input} from "@angular/core";
import {School, Year} from "examination/entities";
import {YearHttpClient} from "examination/models/http";
import {MsDialogRef} from "@ms-fluent/components";
import {YearAddForm} from "../form";

@Component({
  templateUrl: 'YearAdd.html',
  selector: 'YearAdd'
})
export class YearAdd {
  @Input()
  school: School;

  form = new YearAddForm();

  constructor(private httpClient: YearHttpClient, private dialog: MsDialogRef<YearAdd>) {
  }

  async add() {
    const model = this.form.getModel();
    let year = await this.httpClient.add(this.school, model);
    year = new Year(year);

    year.school = this.school;
    year.schoolId = this.school.id;
    this.school.years?.unshift(year);

    this.dialog.close(year);
  }
}
