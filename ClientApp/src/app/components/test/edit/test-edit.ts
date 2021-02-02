import {Component, Input, OnInit} from '@angular/core';
import {AlertEmitter} from 'src/controls/alert-emitter';
import {Test, TestHttpClient} from 'src/models';
import {TestEditForm} from '../form';
import {MsfModalRef} from 'fabric-docs';


@Component({
  templateUrl: 'test-edit.html'
})
export class TestEdit implements OnInit {
  form: TestEditForm;

  @Input()
  test: Test;

  constructor(private _httpClient: TestHttpClient,
              private _dialogRef: MsfModalRef<TestEdit>,
              private _alertEmitter: AlertEmitter) {

  }

  async ngOnInit() {
    this.form = new TestEditForm(this.test);
  }


  async edit() {
    const model = this.form.getModel().body;
    await this._httpClient.update(this.test.id, model);

    this.test.useAnonymity = model.useAnonymity;
    this.test.coefficient = model.coefficient;

    this._alertEmitter.info(`L'épreuve ${this.test.course.name} a été modifiée.`);
    this._dialogRef.close(this.test);
  }
}
