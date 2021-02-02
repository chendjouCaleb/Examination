import {CurrentItems} from "examination/app/current-items";
import {ExaminationDepartment, ExaminationDepartmentHttpClient, ExaminationDepartmentLoader} from "examination/models";
import {ActivatedRouteSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ExaminationDepartmentResolver {

  constructor(private _loader: ExaminationDepartmentLoader,
              private _httpClient: ExaminationDepartmentHttpClient,
              private items: CurrentItems) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<ExaminationDepartment> {
    const id = +route.paramMap.get("examinationDepartmentId");

    const item = await this._loader.loadById(id);
    this.items.put("examinationDepartment", item);

    return item;
  }
}
