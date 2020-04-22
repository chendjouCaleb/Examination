import {Injectable} from "@angular/core";
import {EntityLoader} from "./entity-loader.interface";
import {Admin, Organisation} from "../entities";
import {AdminHttpClient, UserHttpClient} from "../httpClient";
import {OrganisationLoader} from "./organisation.loader";
import {List} from "@positon/collections";


@Injectable({providedIn: "root"})
export class AdminLoader implements EntityLoader<Admin, number> {

  constructor(private adminRepository: AdminHttpClient,
              private _userHttClient: UserHttpClient,
              private _organisationLoader: OrganisationLoader) {
  }

  async load(item: Admin): Promise<Admin> {
    if(item.userId) {
      item.user = await this._userHttClient.findAsync(item.userId);
    }

    item.registerUser = await this._userHttClient.findAsync(item.registerUserId);
    item.organisation = await this._organisationLoader.loadById(item.organisationId);
    return item;
  }

  async loadById(id: number): Promise<Admin> {
    const item = await this.adminRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByOrganisation(organisation: Organisation): Promise<List<Admin>> {
    const admins = await this.adminRepository.listAsync({organisationId: organisation.id});
    for (const admin of admins) {
      await this.load(admin);
    }

    return admins;
  }
}
