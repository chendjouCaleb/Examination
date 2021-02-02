import {Injectable} from "@angular/core";

import {AuthorizationManager} from "examination/app/authorization";
import {DepartmentLoader} from "./department.loader";
import {Loader} from "../loader";
import {Department, Level} from "examination/entities";
import {LevelHttpClient, UserHttpClient} from "examination/models/http";


@Injectable({providedIn: "root"})
export class LevelLoader extends Loader<Level, number> {

  constructor( _httpClient: LevelHttpClient,
               private _userHttClient: UserHttpClient,
               private _departmentLoader: DepartmentLoader,
               private _authorization: AuthorizationManager) {
    super(_httpClient);
  }

  async load(item: Level): Promise<Level> {
    item.department = await this._departmentLoader.loadById(item.departmentId);

    item.userPrincipal.isDepartmentPrincipal = item.department.principalUserId === this._authorization.user?.id;
    item.userPrincipal.isSchoolPrincipal = item.department.school.principalUserId === this._authorization.user?.id;
    return item;
  }

  async loadById(id: number): Promise<Level> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByDepartment(department: Department): Promise<void> {
    if(!department.levels) {
      const levels = await this._httpClient.listAsync({departmentId: department.id});
      for (const item of levels) {
        await this.load(item);
      }
      department.levels = levels;
    }

  }
}
