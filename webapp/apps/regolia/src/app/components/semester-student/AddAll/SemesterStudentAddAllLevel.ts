import {Component, Inject} from "@angular/core";
import {AlertEmitter} from "@examination/controls";
import {SemesterStudentHttpClient} from "@examination/models/http";
import {MS_DIALOG_DATA, MsDialogRef} from "@ms-fluent/components";
import {SemesterLevel, YearLevel} from "@examination/models/entities";

@Component({
  templateUrl: 'SemesterStudentAddAllLevel.html',
  selector: 'SemesterStudentAddAllLevel'
})
export class SemesterStudentAddAllLevel {
  semesterLevel: SemesterLevel;

  constructor(private alertEmitter: AlertEmitter,
              private modalRef: MsDialogRef<SemesterStudentAddAllLevel>,
              @Inject(MS_DIALOG_DATA) data,
              private httpClient: SemesterStudentHttpClient) {
    this.semesterLevel = data.semesterLevel;
  }


  async addAll() {
    const items = await this.httpClient.addAllLevelStudents(this.semesterLevel);
    this.alertEmitter.info("Les étudiants du niveau ont été ajoutés au semestre !");
    this.modalRef.close(items);
  }
}
