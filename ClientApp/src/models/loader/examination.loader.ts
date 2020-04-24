import {Injectable} from "@angular/core";
import {EntityLoader} from "./entity-loader.interface";
import {Examination, Organisation} from "../entities";
import {ExaminationHttpClient, UserHttpClient} from "../httpClient";
import {OrganisationLoader} from "./organisation.loader";
import {List} from "@positon/collections";


@Injectable({providedIn: "root"})
export class ExaminationLoader implements EntityLoader<Examination, number> {

  constructor(private examinationRepository: ExaminationHttpClient,
              private _userHttClient: UserHttpClient,
              private _organisationLoader: OrganisationLoader) {
  }

  async load(item: Examination): Promise<Examination> {
    if(item.registerUserId){
      item.registerUser = await this._userHttClient.findAsync(item.registerUserId);
    }

    item.organisation = await this._organisationLoader.loadById(item.organisationId);
    return item;
  }

  async loadById(id: number): Promise<Examination> {
    const item = await this.examinationRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByOrganisation(organisation: Organisation): Promise<List<Examination>> {
    const examinations = await this.examinationRepository.listAsync({organisationId: organisation.id});
    for (const examination of examinations) {
      await this.load(examination);
    }

    return examinations;
  }
}
