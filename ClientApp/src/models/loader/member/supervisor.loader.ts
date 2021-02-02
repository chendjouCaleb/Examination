import {Injectable} from '@angular/core';
import {EntityLoader} from '../entity-loader.interface';
import {DepartmentLoader} from '../organisation';
import {Department, Supervisor} from 'examination/entities';
import {SupervisorHttpClient, UserHttpClient} from 'examination/models/http';


@Injectable({providedIn: 'root'})
export class SupervisorLoader implements EntityLoader<Supervisor, number> {

  constructor(private supervisorRepository: SupervisorHttpClient,
              private _userHttClient: UserHttpClient,
              private _departmentLoader: DepartmentLoader) {
  }

  async load(item: Supervisor): Promise<Supervisor> {
    if (item.userId) {
      item.user = await this._userHttClient.findAsync(item.userId);
    }

    item.department = await this._departmentLoader.loadById(item.departmentId);
    return item;
  }

  async loadById(id: number): Promise<Supervisor> {
    const item = await this.supervisorRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByDepartment(department: Department): Promise<void> {
    if (!department.supervisors) {
      const supervisors = await this.supervisorRepository.list({departmentId: department.id});
      for (const supervisor of supervisors) {
        await this.load(supervisor);
      }
      department.supervisors = supervisors;
    }
  }
}
