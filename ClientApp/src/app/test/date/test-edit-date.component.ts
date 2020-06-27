import {Component, Input, OnInit} from "@angular/core";
import {AlertEmitter} from "src/controls/alert-emitter";
import {RoomHttpClient, SpecialityHttpClient, Test, TestHttpClient, TestLoader} from "src/models";
import {TestEditDateForm} from "../form";
import {MsfModalRef} from "fabric-docs";


@Component({
  templateUrl: 'test-edit-date.component.html'
})
export class TestEditDateComponent implements OnInit {
  form: TestEditDateForm;

  @Input()
  test: Test;

  constructor(private _httpClient: TestHttpClient,
              private _roomHttpClient: RoomHttpClient,
              private _specialityHttpClient: SpecialityHttpClient,
              private _loader: TestLoader,
              private _dialogRef: MsfModalRef<TestEditDateComponent>,
              private _alertEmitter: AlertEmitter) {

  }

  async ngOnInit() {
    this.form = new TestEditDateForm({
      day: this.test.expectedStartDate,
      startHour: this.test.expectedStartHour,
      endHour: this.test.expectedEndHour
    });
    console.log(this.test.expectedStartDate);
  }


  async edit() {
    const formModel = this.form.getModel();
    let test = await this._httpClient.changeDates(this.test, formModel.body);

    this.test.expectedStartDate = formModel.body.expectedStartDate;
    this.test.expectedEndDate = formModel.body.expectedEndDate;
    this._alertEmitter.info(`L'épreuve a été reprogrammée.`);
    this._dialogRef.close(test);
  }
}
