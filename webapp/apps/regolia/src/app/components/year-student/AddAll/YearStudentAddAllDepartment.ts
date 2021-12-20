import {Component, Inject} from "@angular/core";
import {AlertEmitter} from "@examination/controls";
import {YearStudentHttpClient} from "@examination/models/http";
import {MS_DIALOG_DATA, MsDialogRef} from "@ms-fluent/components";
import {YearDepartment} from "@examination/models/entities";

@Component({
  templateUrl: 'YearStudentAddAllDepartment.html',
  selector: 'YearStudentAddAllDepartment'
})
export class YearStudentAddAllDepartment {
  yearDepartment: YearDepartment;

  constructor(private alertEmitter: AlertEmitter,
              private modalRef: MsDialogRef<YearStudentAddAllDepartment>,
              @Inject(MS_DIALOG_DATA) data,
              private httpClient: YearStudentHttpClient) {
    this.yearDepartment = data.yearDepartment;
  }


  async addAll() {
    const items = await this.httpClient.addAllDepartment(this.yearDepartment);
    this.alertEmitter.info("Les étudiants du département ont été ajoutés à l'année scolaire !");
    this.modalRef.close(items);
  }
}
