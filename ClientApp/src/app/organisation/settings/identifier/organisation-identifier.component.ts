import {OrganisationEditForm, OrganisationIdentifierForm} from "../../form";
import {Organisation, OrganisationHttpClient} from "../../../../models";
import {Component, Input, OnInit} from "@angular/core";
import {AlertEmitter} from "../../../../controls/alert-emitter";


@Component({
  templateUrl: 'organisation-identifier.component.html',
  selector: 'app-organisation-identifier'

})
export class OrganisationIdentifierComponent implements OnInit {

  @Input()
  organisation: Organisation;


  form: OrganisationIdentifierForm;

  constructor(private _httpClient: OrganisationHttpClient, private _alertEmitter: AlertEmitter) {
  }

  ngOnInit(): void {
    this.form = new OrganisationIdentifierForm(this.organisation);
  }

  async checkIdentifier() {
    const identifier = this.form.getControl("identifier");
    if (identifier.value.match(/^[a-zA-Z0-9]+$/) && identifier.value !== this.organisation.identifier ) {
      const user = await this._httpClient.findByIdentifier(identifier.value);
      if (user.id) {
        identifier.addError("Cet identifiant est déjà utilisé");
      }
    }
  }

  async edit() {

    const identifier  =  this.form.getModel().identifier;
    await this._httpClient.identifier(this.organisation.id, identifier);
    this.organisation.identifier = identifier;
    this._alertEmitter.info(`L'identifiant a été modifié.`);
  }
}
