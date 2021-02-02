import {CurrentItems} from "examination/app/current-items";
import {ExaminationLevel, ExaminationLevelHttpClient, ExaminationLevelLoader} from "examination/models";
import {ActivatedRouteSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ExaminationLevelResolver {

  constructor(private _loader: ExaminationLevelLoader,
              private _httpClient: ExaminationLevelHttpClient,
              private items: CurrentItems) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<ExaminationLevel> {
    const id = +route.paramMap.get("examinationLevelId");

    const item = await this._loader.loadById(id);
    this.items.put("examinationLevel", item);

    return item;
  }
}
