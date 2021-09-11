import {Component, Input, OnInit} from '@angular/core';
import {School} from 'examination/entities';
import {SchoolEditForm} from 'examination/app/components/school/form';
import {SchoolHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';
import {MsDialogRef} from '@ms-fluent/components';

@Component({
  templateUrl: 'school-edit.html'
})
export class SchoolEdit implements OnInit {
  @Input()
  school: School;


  form: SchoolEditForm;

  constructor(private _httpClient: SchoolHttpClient,
              private _alertEmitter: AlertEmitter,
              private _modalRef: MsDialogRef<SchoolEdit>) {
  }

  ngOnInit(): void {
    this.form = new SchoolEditForm(this.school);
  }

  async edit() {
    const model = this.form.getModel();
    await this._httpClient.updateAsync(this.school.id, model);

    this.school.name = model.name;
    this.school.acronym = model.acronym;
    this.school.address = model.address;

    this._alertEmitter.info(`Les informations ont été modifiée.`);

    if (this._modalRef) {
      this._modalRef.close();
    }
  }
}
