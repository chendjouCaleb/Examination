import {Component, Inject} from "@angular/core";
import {AlertEmitter} from "@examination/controls";
import {YearStudentHttpClient} from "@examination/models/http";
import {MS_DIALOG_DATA, MsDialogRef} from "@ms-fluent/components";
import {Year} from "@examination/models/entities";

@Component({
  templateUrl: 'YearStudentAddAll.html',
  selector: 'YearStudentAddAll'
})
export class YearStudentAddAll {
  year: Year;

  constructor(private alertEmitter: AlertEmitter,
              private modalRef: MsDialogRef<YearStudentAddAll>,
              @Inject(MS_DIALOG_DATA) data,
              private httpClient: YearStudentHttpClient) {
    this.year = data.year;
  }


  async addAll() {
    const items = await this.httpClient.addAll(this.year);
    this.alertEmitter.info("Les étudiants ont été ajoutés à l'année scolaire !");
    this.modalRef.close(items);
  }
}
