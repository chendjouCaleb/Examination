import {Group, GroupLoader} from "examination/models";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {CurrentItems} from "examination/app/current-items";

@Injectable({
  providedIn: "root"
})
export class GroupResolver {

  constructor(private _loader: GroupLoader, private items: CurrentItems) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Group> {
    const id = +route.paramMap.get("groupId");

    const item = await this._loader.loadById(id);
    this.items.put("group", item);

    return item;

  }
}
