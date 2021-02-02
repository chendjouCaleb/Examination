import {Injectable} from '@angular/core';

import {AuthorizationManager} from 'examination/app/authorization';
import {SchoolLoader} from './school.loader';
import {Loader} from '../loader';
import {Department, School} from 'examination/entities';
import {DepartmentHttpClient, UserHttpClient} from 'examination/models/http';
import {List} from '@positon/collections';


@Injectable({providedIn: 'root'})
export class DepartmentLoader extends Loader<Department, number> {

  constructor(private httpClient: DepartmentHttpClient,
              private _userHttClient: UserHttpClient,
              private _schoolLoader: SchoolLoader,
              private _authorization: AuthorizationManager) {
    super(httpClient);
  }

  async load(item: Department): Promise<Department> {
    item.school = await this._schoolLoader.loadById(item.schoolId);
    item.principalUser = await this._userHttClient.findAsync(item.principalUserId);

    item.userPrincipal.isSchoolPrincipal = item.school.principalUserId === this._authorization.user?.id;
    item.userPrincipal.isPrincipal = item.principalUserId === this._authorization.user?.id;

    if (item.hasImage) {
      item.imageUrl = this.httpClient.getImageUrl(item);
    }


    if (item.hasCoverImage) {
      item.coverImageUrl = this.httpClient.getCoverImageUrl(item);
    } else {
      item.coverImageUrl = 'https://cdn.spacetelescope.org/archives/images/wallpaper1/heic1307a.jpg';
    }

    return item;
  }

  async loadById(id: number): Promise<Department> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }

  /**
   * @deprecated
   */
  async loadForSchool(school: School): Promise<List<Department>> {
    const departments = await this._httpClient.listAsync({schoolId: school.id});
    for (const item of departments) {
      await this.load(item);
    }
    return departments;
  }

  async loadBySchool(school: School): Promise<void> {
    const departments = await this._httpClient.listAsync({schoolId: school.id});
    for (const item of departments) {
      await this.load(item);
      item.school = school;
    }
    school.departments = departments;
  }
}
