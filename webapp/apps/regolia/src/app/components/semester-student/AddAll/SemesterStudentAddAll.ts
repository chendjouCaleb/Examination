import {Component, Inject} from "@angular/core";
import {AlertEmitter} from "@examination/controls";
import {SemesterStudentHttpClient} from "@examination/models/http";
import {MS_DIALOG_DATA, MsDialogRef} from "@ms-fluent/components";
import {Semester} from "@examination/models/entities";

@Component({
  templateUrl: 'SemesterStudentAddAll.html',
  selector: 'SemesterStudentAddAll'
})
export class SemesterStudentAddAll {
  semester: Semester;

  constructor(private alertEmitter: AlertEmitter,
              private modalRef: MsDialogRef<SemesterStudentAddAll>,
              @Inject(MS_DIALOG_DATA) data,
              private httpClient: SemesterStudentHttpClient) {
    this.semester = data.semester;
  }


  async addAll() {
    const items = await this.httpClient.addAll(this.semester);
    this.alertEmitter.info("Les étudiants ont été ajoutés au semestre !");
    this.modalRef.close(items);
  }
}
