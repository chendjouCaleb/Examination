import {Component, Inject, Input} from "@angular/core";
import {Semester, Year} from "examination/entities";
import {SemesterHttpClient} from "examination/models/http";
import {MS_DIALOG_DATA, MsDialogRef} from "@ms-fluent/components";
import {SemesterAddForm} from "../form";
import {AlertEmitter} from "src/controls";

@Component({
  templateUrl: 'SemesterAdd.html',
  selector: 'SemesterAdd'
})
export class SemesterAdd {
  year: Year;

  form = new SemesterAddForm();

  constructor(private httpClient: SemesterHttpClient,
              @Inject(MS_DIALOG_DATA) data,
              private _alertEmitter: AlertEmitter,
              private dialog: MsDialogRef<SemesterAdd>) {
    this.year = data.year;

    let expectedStartDate = new Date();
    let expectedEndDate = null;

    if(!this.year.semesters || this.year.semesters?.length == 0) {
      expectedStartDate = this.year.expectedStartDate;
    }else {
      expectedStartDate = this.year.semesters[this.year.semesters.length - 1].expectedEndDate;
      expectedStartDate.setDate(expectedStartDate.getDate() + 1);
      expectedEndDate = this.year.expectedEndDate;
    }

    this.form = new SemesterAddForm({expectedStartDate, expectedEndDate})
  }

  async add() {
    const model = this.form.getModel();
    let semester = await this.httpClient.add(this.year, model);
    semester = new Semester(semester);

    semester.year = this.year;
    semester.yearId = this.year.id;
    this.year.semesters?.push(semester);
    this.year.school.semesters?.push(semester);

    this._alertEmitter.info('Le semestre a été ajouté !');

    this.dialog.close(semester);
  }
}
