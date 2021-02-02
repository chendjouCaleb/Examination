﻿import {Application, ApplicationLoader} from "examination/models";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {CurrentItems} from "examination/app/current-items";
import {AuthorizationManager} from "examination/app/authorization";

@Injectable({
  providedIn: "root"
})
export class ApplicationResolver {

  constructor(private _loader: ApplicationLoader,
              private _identity: AuthorizationManager,
              private items: CurrentItems) { }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Application> {
    const id = +route.paramMap.get("applicationId");

    const item = await this._loader.loadById(id);

    if(this._identity.user && this._identity.user.id === item.userId){
      item.isAuthor = true;
    }
    this.items.put("application", item);

    return item;
  }
}
