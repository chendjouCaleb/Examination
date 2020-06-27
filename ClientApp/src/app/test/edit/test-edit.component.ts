import {Component, Input, OnInit} from "@angular/core";
import {AlertEmitter} from "src/controls/alert-emitter";
import {Test, TestHttpClient} from "src/models";
import {TestEditForm} from "../form";
import {MsfModalRef} from "fabric-docs";


@Component({
  templateUrl: 'test-edit.component.html'
})
export class TestEditComponent implements OnInit {
  form: TestEditForm;

  @Input()
  test: Test;

  constructor(private _httpClient: TestHttpClient,
              private _dialogRef: MsfModalRef<TestEditComponent>,
              private _alertEmitter: AlertEmitter) {

  }

  async ngOnInit() {
    this.form = new TestEditForm(this.test);
  }


  async edit() {
    const model = this.form.getModel().body;
    await this._httpClient.update(this.test.id, model);

    this.test.name = model.name;
    this.test.code = model.code;
    this.test.coefficient = model.coefficient;
    this.test.radical = model.radical;

    this._alertEmitter.info(`L'épreuve ${this.test.name} a été modifiée.`);
    this._dialogRef.close(this.test);
  }
}
