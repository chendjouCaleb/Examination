import {Component, Input, OnInit} from '@angular/core';
import {AlertEmitter} from 'src/controls/alert-emitter';
import {Test, TestHttpClient} from 'src/models';
import {TestEditDateForm} from '../form';
import {MsDialogRef} from '@ms-fluent/components';


@Component({
  templateUrl: 'test-edit-date.html'
})
export class TestEditDate implements OnInit {
  form: TestEditDateForm;

  @Input()
  test: Test;

  constructor(private _httpClient: TestHttpClient,
              private _dialogRef: MsDialogRef<TestEditDate>,
              private _alertEmitter: AlertEmitter) {

  }

  async ngOnInit() {
    this.form = new TestEditDateForm({
      day: this.test.expectedStartDate,
      startHour: this.test.expectedStartHour,
      endHour: this.test.expectedEndHour
    });
  }


  async edit() {
    const formModel = this.form.getModel();
    const test = await this._httpClient.changeDates(this.test, formModel.body);

    this.test.expectedStartDate = formModel.body.expectedStartDate;
    this.test.expectedEndDate = formModel.body.expectedEndDate;
    this._alertEmitter.info(`L'épreuve a été reprogrammée.`);
    this._dialogRef.close(test);
  }
}
