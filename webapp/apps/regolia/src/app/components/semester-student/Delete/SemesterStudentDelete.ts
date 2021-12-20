import {Component, Inject} from "@angular/core";
import {MS_DIALOG_DATA, MsDialogRef} from "@ms-fluent/components";
import {AlertEmitter} from "src/controls";
import {SemesterStudent} from "examination/entities";
import {SemesterStudentHttpClient} from "@examination/http";

@Component({
  templateUrl: 'SemesterStudentDelete.html',
  selector: 'SemesterStudentDelete'
})
export class SemesterStudentDelete {
  semesterStudent: SemesterStudent;

  constructor(private _httpClient: SemesterStudentHttpClient,
              private dialogRef: MsDialogRef<SemesterStudentDelete>,
              private alertEmitter: AlertEmitter,
              @Inject(MS_DIALOG_DATA) private data) {
    this.semesterStudent = data.semesterStudent;
  }

 async delete() {
    await this._httpClient.delete(this.semesterStudent.id);
    this.alertEmitter.info(`L'étudant ${this.semesterStudent.yearStudent.student.fullName} a été supprimé du semestre.`);
    this.dialogRef.close(true);
 }
}
