import {Component} from '@angular/core';
import {OrganisationAddForm} from 'src/app/organisation';
import {OrganisationHttpClient} from 'src/models';
import {Router} from '@angular/router';
import {AlertEmitter} from '../../../../controls/alert-emitter';

@Component({
  templateUrl: 'organisation-add.page.html'
})
export class OrganisationAddPage {
  form = new OrganisationAddForm();

  constructor(private _httpClient: OrganisationHttpClient, private _router: Router, private _alertEmitter: AlertEmitter) {
  }

  async checkIdentifier() {
    const identifier = this.form.getControl('identifier');
    if (identifier.value.match(/^[a-zA-Z0-9]+$/)) {
      const user = await this._httpClient.findByIdentifier(identifier.value);
      if (user.id) {
        identifier.addError('Cet identifiant est déjà utilisé');
      }
    }
  }


  async add() {
    const model = await this._httpClient.add(this.form.getModel());
    this._alertEmitter.info(`Votre compte a été crée. Bienvenue ${model.name}.`);
    await this._router.navigateByUrl('/organisations');
  }
}
