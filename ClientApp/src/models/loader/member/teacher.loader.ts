import {Injectable} from '@angular/core';
import {EntityLoader} from '../entity-loader.interface';
import {DepartmentLoader} from '../organisation';
import {Department, Teacher} from 'examination/entities';
import {TeacherHttpClient, UserHttpClient} from 'examination/models/http';


@Injectable({providedIn: 'root'})
export class TeacherLoader implements EntityLoader<Teacher, number> {

  constructor(private teacherRepository: TeacherHttpClient,
              private _userHttClient: UserHttpClient,
              private _departmentLoader: DepartmentLoader) {
  }

  async load(item: Teacher): Promise<Teacher> {
    if (item.userId) {
      item.user = await this._userHttClient.findAsync(item.userId);
    }

    item.department = await this._departmentLoader.loadById(item.departmentId);
    return item;
  }

  async loadById(id: number): Promise<Teacher> {
    const item = await this.teacherRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByDepartment(department: Department): Promise<void> {
    if (!department.teachers) {
      const teachers = await this.teacherRepository.list({departmentId: department.id});
      for (const teacher of teachers) {
        await this.load(teacher);
      }
      department.teachers = teachers;
    }
  }
}
