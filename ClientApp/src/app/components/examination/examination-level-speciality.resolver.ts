import {CurrentItems} from "examination/app/current-items";
import {ExaminationLevelSpeciality, ExaminationLevelSpecialityHttpClient, ExaminationLevelSpecialityLoader} from "examination/models";
import {ActivatedRouteSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ExaminationLevelSpecialityResolver {

  constructor(private _loader: ExaminationLevelSpecialityLoader,
              private _httpClient: ExaminationLevelSpecialityHttpClient,
              private items: CurrentItems) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<ExaminationLevelSpeciality> {
    const id = +route.paramMap.get("examinationLevelSpecialityId");

    const item = await this._loader.loadById(id);
    this.items.put("examinationLevelSpeciality", item);

    return item;
  }
}
