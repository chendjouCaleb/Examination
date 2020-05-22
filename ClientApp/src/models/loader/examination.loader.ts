import {Injectable} from "@angular/core";
import {EntityLoader} from "./entity-loader.interface";
import {Examination, Organisation} from "../entities";
import {ExaminationHttpClient, UserHttpClient} from "../httpClient";
import {OrganisationLoader} from "./organisation.loader";
import {List} from "@positon/collections";
import {AuthorizationManager} from "examination/app/authorization";


@Injectable({providedIn: "root"})
export class ExaminationLoader implements EntityLoader<Examination, number> {

  constructor(private _httpClient: ExaminationHttpClient,
              private _userHttClient: UserHttpClient,
              private identity: AuthorizationManager,
              private _organisationLoader: OrganisationLoader) {
  }

  async load(item: Examination): Promise<Examination> {
    if(item.registerUserId){
      item.registerUser = await this._userHttClient.findAsync(item.registerUserId);
    }

    if (this.identity.user) {
      item.userPrincipal = await this._httpClient.examinationUser(item.id, this.identity.user.id);
    }

    item.organisation = await this._organisationLoader.loadById(item.organisationId);
    return item;
  }

  async loadById(id: number): Promise<Examination> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByOrganisation(organisation: Organisation): Promise<List<Examination>> {
    const examinations = await this._httpClient.listAsync({organisationId: organisation.id});
    for (const examination of examinations) {
      await this.load(examination);
    }

    return examinations;
  }
}
