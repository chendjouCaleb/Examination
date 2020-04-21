import {Organisation, OrganisationHttpClient} from "../../models";
import {AuthorizationManager} from "../authorization/authorization-manager";
import {CurrentItems} from "../current-items";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class OrganisationResolver {

  constructor(private _httpClient: OrganisationHttpClient,
              private items: CurrentItems, private identity: AuthorizationManager ) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Organisation> {
    const id = +route.paramMap.get("organisationId");

    const item = await this._httpClient.findAsync(id);
    this.items.put("organisation", item);

    return item;

  }
}
