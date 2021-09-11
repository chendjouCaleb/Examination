import {Component, Input} from '@angular/core';
import {Examination} from 'examination/entities';
import {ExaminationHttpClient} from 'examination/models/http';
import {MsDialogRef} from '@ms-fluent/components';

@Component({
  templateUrl: 'examination-delete.html'
})
export class ExaminationDelete {
  @Input()
  examination: Examination;

  constructor(private _httpClient: ExaminationHttpClient,
              private _modalRef: MsDialogRef<ExaminationDelete>) {}

  async delete() {
    await this._httpClient.delete(this.examination.id);
    this.examination.school.examinations.remove(this.examination);

    if (this._modalRef) {
      this._modalRef.close(true);
    }
  }
}
