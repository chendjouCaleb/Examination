import {Injectable} from "@angular/core";
import {EntityLoader} from "./entity-loader.interface";
import {Organisation} from "../entities";
import {OrganisationHttpClient, UserHttpClient} from "../httpClient";


@Injectable({providedIn: "root"})
export class OrganisationLoader implements EntityLoader<Organisation, number> {

  constructor(private _httpClient: OrganisationHttpClient, private _userHttClient: UserHttpClient) {
  }

  async load(item: Organisation): Promise<Organisation> {
    item.user = await this._userHttClient.findAsync(item.userId);
    item.adminUser = await this._userHttClient.findAsync(item.adminUserId);
    item.statistics = await this._httpClient.getStatistics(item);
    return item;
  }

  async loadById(id: number): Promise<Organisation> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }
}
