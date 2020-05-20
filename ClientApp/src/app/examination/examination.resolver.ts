import {Examination, ExaminationHttpClient, ExaminationLoader} from "examination/models";
import {AuthorizationManager} from "examination/app/authorization";
import {CurrentItems} from "../current-items";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ExaminationResolver {

  constructor(private _loader: ExaminationLoader,
              private _httpClient: ExaminationHttpClient,
              private items: CurrentItems, private identity: AuthorizationManager) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Examination> {
    const id = +route.paramMap.get("examinationId");

    const item = await this._loader.loadById(id);
    this.items.put("examination", item);

    if (this.identity.user) {
      const examinationUser = await this._httpClient.examinationUser(id, this.identity.user.id);
      this.items.put("examinationUser", examinationUser);
      item.userPrincipal = examinationUser;
    }

    return item;
  }
}
