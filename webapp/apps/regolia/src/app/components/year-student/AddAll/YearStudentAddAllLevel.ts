import {Component, Inject} from "@angular/core";
import {AlertEmitter} from "@examination/controls";
import {YearStudentHttpClient} from "@examination/models/http";
import {MS_DIALOG_DATA, MsDialogRef} from "@ms-fluent/components";
import {Year, YearLevel} from "@examination/models/entities";

@Component({
  templateUrl: 'YearStudentAddAllLevel.html',
  selector: 'YearStudentAddAllLevel'
})
export class YearStudentAddAllLevel {
  yearLevel: YearLevel;

  constructor(private alertEmitter: AlertEmitter,
              private modalRef: MsDialogRef<YearStudentAddAllLevel>,
              @Inject(MS_DIALOG_DATA) data,
              private httpClient: YearStudentHttpClient) {
    this.yearLevel = data.yearLevel;
  }


  async addAll() {
    const items = await this.httpClient.addAllLevel(this.yearLevel);
    this.alertEmitter.info("Les étudiants du niveau ont été ajoutés à l'année scolaire !");
    this.modalRef.close(items);
  }
}
