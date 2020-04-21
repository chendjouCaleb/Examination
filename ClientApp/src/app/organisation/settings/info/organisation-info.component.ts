import {OrganisationEditForm} from "../../form";
import {Organisation, OrganisationHttpClient} from "../../../../models";
import {Component, Input, OnInit} from "@angular/core";
import {AlertEmitter} from "../../../../controls/alert-emitter";


@Component({
  templateUrl: 'organisation-info.component.html',
  selector: 'app-organisation-info'

})
export class OrganisationInfoComponent implements OnInit{

  @Input()
  organisation: Organisation;


  form: OrganisationEditForm;

  constructor(private _httpClient: OrganisationHttpClient, private _alertEmitter: AlertEmitter) {}

  ngOnInit(): void {
    this.form = new OrganisationEditForm(this.organisation);
  }

  async edit() {

    let model = await this._httpClient.updateAsync(this.organisation.id, this.form.getModel());
    this._alertEmitter.info(`Les informations ont été modifiée.`);
  }
}
