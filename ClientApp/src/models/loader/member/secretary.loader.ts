import {Injectable} from '@angular/core';
import {EntityLoader} from '../entity-loader.interface';
import {DepartmentLoader} from '../organisation';
import {Department, Secretary} from 'examination/entities';
import {SecretaryHttpClient, UserHttpClient} from 'examination/models/http';


@Injectable({providedIn: 'root'})
export class SecretaryLoader implements EntityLoader<Secretary, number> {

  constructor(private secretaryRepository: SecretaryHttpClient,
              private _userHttClient: UserHttpClient,
              private _departmentLoader: DepartmentLoader) {
  }

  async load(item: Secretary): Promise<Secretary> {
    if (item.userId) {
      item.user = await this._userHttClient.findAsync(item.userId);
    }

    item.department = await this._departmentLoader.loadById(item.departmentId);
    return item;
  }

  async loadById(id: number): Promise<Secretary> {
    const item = await this.secretaryRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByDepartment(department: Department): Promise<void> {
    if (!department.secretaries) {
      const secretaries = await this.secretaryRepository.list({departmentId: department.id});
      for (const secretary of secretaries) {
        await this.load(secretary);
      }
      department.secretaries = secretaries;
    }
  }
}
