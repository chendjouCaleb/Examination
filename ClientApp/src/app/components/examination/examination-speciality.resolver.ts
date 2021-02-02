import {CurrentItems} from "examination/app/current-items";
import {ExaminationSpeciality, ExaminationSpecialityHttpClient, ExaminationSpecialityLoader} from "examination/models";
import {ActivatedRouteSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ExaminationSpecialityResolver {

  constructor(private _loader: ExaminationSpecialityLoader,
              private _httpClient: ExaminationSpecialityHttpClient,
              private items: CurrentItems) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<ExaminationSpeciality> {
    const id = +route.paramMap.get("examinationSpecialityId");

    const item = await this._loader.loadById(id);
    this.items.put("examinationSpeciality", item);

    return item;
  }
}
