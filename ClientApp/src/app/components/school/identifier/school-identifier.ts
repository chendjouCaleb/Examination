import {Component, Input, OnInit} from '@angular/core';
import {School} from 'examination/entities';
import {SchoolIdentifierForm} from 'examination/app/components/school/form';
import {SchoolHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';
import {MsfModalRef} from "fabric-docs";

@Component({
  templateUrl: 'school-identifier.html'
})
export class SchoolIdentifier implements OnInit {
  @Input()
  school: School;
  form: SchoolIdentifierForm;

  constructor(private _httpClient: SchoolHttpClient,
              private _modalRef: MsfModalRef<SchoolIdentifier>,
              private _alertEmitter: AlertEmitter) {
  }

  ngOnInit(): void {
    this.form = new SchoolIdentifierForm(this.school);
  }

  async checkIdentifier() {
    const identifier = this.form.getControl('identifier');
    if (identifier.value.match(/^[a-zA-Z0-9]+$/) && identifier.value !== this.school.identifier) {
      const user = await this._httpClient.findByIdentifier(identifier.value);
      if (user.id) {
        identifier.addError('Cet identifiant est déjà utilisé');
      }
    }
  }

  async edit() {

    const identifier = this.form.getModel().identifier;
    await this._httpClient.identifier(this.school.id, identifier);
    this.school.identifier = identifier;
    this._alertEmitter.info(`L'identifiant a été modifié.`);

    if(this._modalRef) {
      this._modalRef.close();
    }
  }

  cancel() {
    if(this._modalRef) {
      this._modalRef.close();
    }
  }
}
