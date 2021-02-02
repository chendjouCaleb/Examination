import {CurrentItems} from "examination/app/current-items";
import {Examination, ExaminationHttpClient, ExaminationLoader} from "examination/models";
import {ActivatedRouteSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ExaminationResolver {

  constructor(private _loader: ExaminationLoader,
              private _httpClient: ExaminationHttpClient,
              private items: CurrentItems) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<Examination> {
    const id = +route.paramMap.get("examinationId");

    const item = await this._loader.loadById(id);
    this.items.put("examination", item);

    return item;
  }
}
