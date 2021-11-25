import {ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {CurrentItems} from 'examination/app/current-items';
import {AuthorizationManager} from 'examination/app/authorization';
import { SemesterLoader} from "@examination/loaders";
import {SemesterHttpClient} from "@examination/http";
import {Semester} from "@examination/entities";

@Injectable({
  providedIn: 'root'
})
export class SemesterResolver {

  constructor(private _loader: SemesterLoader,
              private _httpClient: SemesterHttpClient,
              private _auth: AuthorizationManager,
              private items: CurrentItems) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<Semester> {
    if (!route.paramMap.has('semesterId')) {
      throw new Error('The current route dont have a parameter named \'semesterId\' ');
    }
    const id = +route.paramMap.get('semesterId');

    const semester = await this._httpClient.findAsync(id);
    await this._loader.load(semester);

    this.items.put('semester', semester);
    return semester;
  }
}
