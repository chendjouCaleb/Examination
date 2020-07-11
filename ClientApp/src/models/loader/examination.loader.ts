import {Injectable} from "@angular/core";
import {EntityLoader} from "./entity-loader.interface";
import {Examination, Organisation} from "../entities";
import {ExaminationHttpClient, UserHttpClient} from "../httpClient";
import {OrganisationLoader} from "./organisation.loader";
import {List} from "@positon/collections";
import {AuthorizationManager} from "examination/app/authorization";
import {Loader} from "./loader";


@Injectable({providedIn: "root"})
export class ExaminationLoader extends Loader<Examination, number> {

  constructor(private _examinationHttpClient: ExaminationHttpClient,
              private _userHttClient: UserHttpClient,
              private identity: AuthorizationManager,
              private _organisationLoader: OrganisationLoader) {
    super(_examinationHttpClient);
  }

  async load(item: Examination): Promise<Examination> {
    if (item.registerUserId) {
      item.registerUser = await this._userHttClient.findAsync(item.registerUserId);
    }
    item.organisation = await this._organisationLoader.loadById(item.organisationId);

    if (this.identity.user) {
      item.userPrincipal = {
        userId : this.identity.user.id,
        isPrincipal: item.organisation.adminUserId === this.identity.user.id,
        isCorrector: false,
        isStudent: false,
        isSecretary: false,
        isSupervisor: false
      }
    }


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
