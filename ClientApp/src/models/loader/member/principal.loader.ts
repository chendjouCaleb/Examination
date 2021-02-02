import {Injectable} from '@angular/core';
import {EntityLoader} from '../entity-loader.interface';
import {DepartmentLoader} from '../organisation';
import {List} from '@positon/collections';
import {Principal, Department} from 'examination/entities';
import {PrincipalHttpClient, UserHttpClient} from 'examination/models/http';


@Injectable({providedIn: 'root'})
export class PrincipalLoader implements EntityLoader<Principal, number> {

  constructor(private principalRepository: PrincipalHttpClient,
              private _userHttClient: UserHttpClient,
              private _departmentLoader: DepartmentLoader) {
  }

  async load(item: Principal): Promise<Principal> {
    if (item.userId) {
      item.user = await this._userHttClient.findAsync(item.userId);
    }

    item.department = await this._departmentLoader.loadById(item.departmentId);
    return item;
  }

  async loadById(id: number): Promise<Principal> {
    const item = await this.principalRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByDepartment(department: Department): Promise<void> {
    if (!department.principals) {
      const principals = await this.principalRepository.list({departmentId: department.id});
      for (const principal of principals) {
        await this.load(principal);
      }
      department.principals = principals;
    }
  }
}
