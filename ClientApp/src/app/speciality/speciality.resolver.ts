import {Speciality, SpecialityLoader} from "examination/models";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {CurrentItems} from "examination/app/current-items";

@Injectable({
  providedIn: "root"
})
export class SpecialityResolver {

  constructor(private _loader: SpecialityLoader, private items: CurrentItems) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Speciality> {
    const id = +route.paramMap.get("specialityId");

    const item = await this._loader.loadById(id);
    this.items.put("speciality", item);

    return item;

  }
}
