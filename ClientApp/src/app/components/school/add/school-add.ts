import {Component, EventEmitter, Input, Optional, Output} from '@angular/core';
import {SchoolAddForm} from 'examination/app/components/school/form';
import {SchoolHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';
import {MsfModalRef} from 'fabric-docs';
import {SchoolLoader} from 'examination/loaders';
import {School} from 'examination/entities';

@Component({
  templateUrl: 'school-add.html',
  selector: 'app-school-add'
})
export class SchoolAdd {
  form = new SchoolAddForm();

  @Input()
  oncancel: () => any;

  @Output()
  oncreated: EventEmitter<School> = new EventEmitter<School>();

  constructor(private _httpClient: SchoolHttpClient,
              private _alertEmitter: AlertEmitter,
              private _loader: SchoolLoader,
              @Optional() private _modal: MsfModalRef<SchoolAdd>) {
  }

  async checkIdentifier() {
    const identifier = this.form.getControl('identifier');
    if (identifier.value.match(/^[a-zA-Z0-9]+$/)) {
      const school = await this._httpClient.findByIdentifier(identifier.value);
      if (school.id) {
        identifier.addError('Cet identifiant est déjà utilisé');
      }
    }
  }


  async add() {
    const school = await this._httpClient.add(this.form.getModel());
    this._alertEmitter.info(`L'école ${school.name} a été creée!`);
    this.oncreated.emit(school);
    await this._loader.load(school);
    if (this._modal) {
      this._modal.close(school);
    }
  }
}
