import {Injectable} from "@angular/core";
import {EntityLoader} from "./entity-loader.interface";
import {Organisation} from "../entities";
import {OrganisationHttpClient, UserHttpClient} from "../httpClient";
import {Loader} from "./loader";


@Injectable({providedIn: "root"})
export class OrganisationLoader extends Loader<Organisation, number> {

  constructor( _httpClient: OrganisationHttpClient, private _userHttClient: UserHttpClient) {
    super(_httpClient);
  }

  async load(item: Organisation): Promise<Organisation> {
    item.user = await this._userHttClient.findAsync(item.userId);
    item.adminUser = await this._userHttClient.findAsync(item.adminUserId);
    return item;
  }

  async loadById(id: number): Promise<Organisation> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }
}
