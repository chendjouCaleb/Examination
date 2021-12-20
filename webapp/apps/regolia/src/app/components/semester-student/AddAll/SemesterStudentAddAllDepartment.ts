import {Component, Inject} from "@angular/core";
import {AlertEmitter} from "@examination/controls";
import {SemesterStudentHttpClient} from "@examination/models/http";
import {MS_DIALOG_DATA, MsDialogRef} from "@ms-fluent/components";
import {SemesterDepartment} from "@examination/models/entities";

@Component({
  templateUrl: 'SemesterStudentAddAllDepartment.html',
  selector: 'SemesterStudentAddAllDepartment'
})
export class SemesterStudentAddAllDepartment {
  semesterDepartment: SemesterDepartment;

  constructor(private alertEmitter: AlertEmitter,
              private modalRef: MsDialogRef<SemesterStudentAddAllDepartment>,
              @Inject(MS_DIALOG_DATA) data,
              private httpClient: SemesterStudentHttpClient) {
    this.semesterDepartment = data.semesterDepartment;
  }


  async addAll() {
    const items = await this.httpClient.addAllDepartment(this.semesterDepartment);
    this.alertEmitter.info("Les étudiants du département ont été ajoutés au semestre !");
    this.modalRef.close(items);
  }
}
