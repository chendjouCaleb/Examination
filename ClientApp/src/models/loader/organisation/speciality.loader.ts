import {Injectable} from '@angular/core';

import {DepartmentLoader} from './department.loader';
import {Department, Speciality} from "examination/entities";
import {Loader} from "../loader";
import {SpecialityHttpClient, UserHttpClient} from "examination/models/http";


@Injectable({providedIn: 'root'})
export class SpecialityLoader extends Loader<Speciality, number> {

  constructor(private specialityRepository: SpecialityHttpClient,
              private _userHttClient: UserHttpClient,
              private _departmentLoader: DepartmentLoader) {
    super(specialityRepository);
  }

  async load(item: Speciality): Promise<Speciality> {
    item.department = await this._departmentLoader.loadById(item.departmentId);
    return item;
  }

  async loadById(id: number): Promise<Speciality> {
    const item = await this.specialityRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByDepartment(department: Department): Promise<void> {
    if (!department.specialities) {
      const specialities = await this.specialityRepository.listAsync({departmentId: department.id});
      for (const speciality of specialities) {
        await this.load(speciality);
      }
      department.specialities = specialities;
    }
  }
}
