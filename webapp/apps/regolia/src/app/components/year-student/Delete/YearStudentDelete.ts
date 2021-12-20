import {Component, Inject, OnInit} from "@angular/core";
import {YearStudent} from "@examination/models/entities";
import {YearStudentHttpClient} from "@examination/models/http";
import {MS_DIALOG_DATA, MsDialogRef} from "@ms-fluent/components";
import {AlertEmitter} from "src/controls";

@Component({
  templateUrl: 'YearStudentDelete.html',
  selector: 'YearStudentDelete'
})
export class YearStudentDelete {
  yearStudent: YearStudent;

  constructor(private _httpClient: YearStudentHttpClient,
              private dialogRef: MsDialogRef<YearStudentDelete>,
              private alertEmitter: AlertEmitter,
              @Inject(MS_DIALOG_DATA) private data) {
    this.yearStudent = data.yearStudent;
  }

 async delete() {
    await this._httpClient.delete(this.yearStudent.id);
    this.alertEmitter.info(`L'étudant ${this.yearStudent.student.fullName} a été supprimé de l'année scolaire.`);
    this.dialogRef.close(true);
 }
}
