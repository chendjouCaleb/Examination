import {Student, StudentLoader} from "examination/models";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {CurrentItems} from "examination/app/current-items";

@Injectable({
  providedIn: "root"
})
export class StudentResolver {

  constructor(private _loader: StudentLoader, private items: CurrentItems) { }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Student> {
    const id = +route.paramMap.get("studentId");

    const item = await this._loader.loadById(id);
    this.items.put("student", item);

    return item;
  }
}
