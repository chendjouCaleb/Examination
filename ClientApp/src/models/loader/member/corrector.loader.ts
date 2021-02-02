import {Injectable} from '@angular/core';
import {EntityLoader} from '../entity-loader.interface';
import {DepartmentLoader} from '../organisation';
import {Corrector, Department} from 'examination/entities';
import {CorrectorHttpClient, UserHttpClient} from 'examination/models/http';


@Injectable({providedIn: 'root'})
export class CorrectorLoader implements EntityLoader<Corrector, number> {

  constructor(private correctorRepository: CorrectorHttpClient,
              private _userHttClient: UserHttpClient,
              private _departmentLoader: DepartmentLoader) {
  }

  async load(item: Corrector): Promise<Corrector> {
    if (item.userId) {
      item.user = await this._userHttClient.findAsync(item.userId);
    }

    item.department = await this._departmentLoader.loadById(item.departmentId);
    return item;
  }

  async loadById(id: number): Promise<Corrector> {
    const item = await this.correctorRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByDepartment(department: Department): Promise<void> {
    if (!department.correctors) {
      const correctors = await this.correctorRepository.list({departmentId: department.id});
      for (const corrector of correctors) {
        await this.load(corrector);
      }
      department.correctors = correctors;
    }
  }
}
